import { GameService } from "../../services";
import { useRecoilState } from "recoil";
import { gamesHistoryAtom } from "../../../view/pages/playground/store";
import { useState } from "react";


export const useGamesHistory = () => {

  const [pending, setPending] = useState<boolean>(false)
  const [gamesHistory, setGamesHistory] = useRecoilState(gamesHistoryAtom)

  const updateHistory = () => {
    setPending(true)
    GameService.getAll()
      .then(result => {
        setGamesHistory(result.data)
      })
      .finally(() => setPending(false))
  }

  return {
    pending,
    gamesHistory,
    updateHistory
  }
}