import { GameService } from "../services";
import { gameAtom } from "../../view/pages/playground/store";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const usePlayBoardUpdateCron = (ms: number) => {
  const [game, setGame] = useRecoilState(gameAtom)

  useEffect(() => {
    setInterval(() => {
      const gameId = game?.id
      if (gameId) GameService.getById(gameId)
        .then(result => {
          setGame(result.data)
        })
    }, ms)
  }, [])

  return
}
