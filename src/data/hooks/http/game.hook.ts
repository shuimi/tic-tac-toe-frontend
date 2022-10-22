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
  onWin?: () => void,
  onLose?: () => void,
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

          switch (result.data.status) {
            case GameStatusModel.X_WIN: {
              if (isX)
                options?.onWin && options?.onWin()
              else
                options?.onLose && options?.onLose()
              break
            }
            case GameStatusModel.O_WIN: {
              if (isX)
                options?.onLose && options?.onLose()
              else
                options?.onWin && options?.onWin()
              break
            }
            case GameStatusModel.DRAW: {
              options?.onDraw && options?.onDraw()
              break
            }
          }

          if (result.data.status !== GameStatusModel.NOT_FINISHED) {
            updateUsersOnline()
            updateMe()
          }

          setGame(result.data)
        })
        .finally(() => setPending(false))
    }
  }

  const reset = () => {
    setGame(null)
  }

  return {
    pending,
    game,
    start,
    move,
    reset
  }
}