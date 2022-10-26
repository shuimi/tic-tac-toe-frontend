import { GameService, UsersService } from "../../services";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  firstTurnMarkAtom,
  gameAtom,
  gameRankAtom,
  selectedEnemyAtom,
  winConditionAtom
} from "../../../view/pages/playground/store";
import { currentUserAtom } from "../../stores/atoms/auth";
import { GameStatusModel, Mark } from "../../models";
import { useState } from "react";
import { useUsers } from "./users.hook";


export const useGame = (options?: {
  onWin?: (deltaMMR?: number | null) => void,
  onLose?: (deltaMMR?: number | null) => void,
  onDraw?: () => void
}) => {

  const {updateUsersOnline, updateMe} = useUsers()

  const [pending, setPending] = useState<boolean>(false)

  const enemy = useRecoilValue(selectedEnemyAtom)
  const gameRank = useRecoilValue(gameRankAtom)
  const winCondition = useRecoilValue(winConditionAtom)
  const firstTurnMark = useRecoilValue(firstTurnMarkAtom)

  const [game, setGame] = useRecoilState(gameAtom)

  const currentUser = useRecoilValue(currentUserAtom)

  const start = () => {
    if (enemy?.id) {
      setPending(true)
      GameService.create(enemy.id, {
        n: gameRank,
        k: winCondition,
        mark: firstTurnMark,
      })
        .then(result => {
          setGame(result.data)
        })
        .finally(() => setPending(false))
    }
  }

  const move = (fieldId: number) => {
    if (game?.id) {

      setPending(true)

      const isX = currentUser.user?.id === game.playerX
      const myMark = isX ? Mark.X : Mark.O

      GameService.move(game?.id, {
        fieldId: fieldId,
        mark: myMark,
      })
        .then(result => {

          const currentMMRString = currentUser.user?.mmr

          if (result.data.status !== GameStatusModel.NOT_FINISHED) {

            updateMe((user) => {

              let deltaMMR = 0

              if (currentMMRString) {
                const currentMMR = parseInt(currentMMRString)
                const newMMRString = user?.mmr
                if (newMMRString) {
                  const newMMR = parseInt(newMMRString)
                  deltaMMR = newMMR - currentMMR
                }
              }

              switch (result.data.status) {
                case GameStatusModel.X_WIN: {
                  if (isX)
                    options?.onWin && options?.onWin(deltaMMR)
                  else
                    options?.onLose && options?.onLose(deltaMMR)
                  break
                }
                case GameStatusModel.O_WIN: {
                  if (isX)
                    options?.onLose && options?.onLose(deltaMMR)
                  else
                    options?.onWin && options?.onWin(deltaMMR)
                  break
                }
                case GameStatusModel.DRAW: {
                  options?.onDraw && options?.onDraw()
                  break
                }
              }

            })
            updateUsersOnline()
          }
          setGame(result.data)
        })
        .finally(() => setPending(false))
    }
  }

  const update = () => {
    const gameId = game?.id
    if (gameId) GameService.getById(gameId)
      .then(result => {
        setGame(result.data)
      })
  }

  const reset = () => {
    setGame(null)
  }

  return {
    pending,
    game,
    start,
    move,
    reset,
    update,
  }
}