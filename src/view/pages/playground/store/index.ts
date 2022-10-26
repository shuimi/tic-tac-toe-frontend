import { atom, selector } from "recoil";
import { localStorageEffect } from "../../../../data/stores/effects";
import { GameModel, GameStatusModel, GameType, Mark, UserModel } from "../../../../data";
import { currentUserAtom } from "../../../../data/stores/atoms/auth";


export const gameRankAtom = atom<number>({
  key: 'gameRankAtom',
  default: 3,
  effects: [localStorageEffect('gameRankAtom')]
})

export const winConditionAtom = atom<number>({
  key: 'winConditionAtom',
  default: 3,
  effects: [localStorageEffect('winConditionAtom')]
})

export const gameTypeAtom = atom<string | null>({
  key: 'gameTypeAtom',
  default: GameType.CLASSIC,
  effects: [localStorageEffect('gameTypeAtom')]
})



export const usersOnlineAtom = atom<UserModel[] | null>({
  key: 'usersOnlineAtom',
  default: null,
})

export const selectedEnemyAtom = atom<UserModel | null>({
  key: 'selectedEnemyAtom',
  default: null,
  effects: [localStorageEffect('selectedEnemyAtom')]
})

export const firstTurnMarkAtom = atom<Mark>({
  key: 'firstTurnMarkAtom',
  default: Mark.EMPTY,
  effects: [localStorageEffect('firstTurnMarkAtom')]
})

export const enemyIsSelected = selector<boolean>({
  key: 'enemyIsSelected',
  get: ({get}) => {
    const selectedEnemy = get(selectedEnemyAtom);
    return !!selectedEnemy
  },
})


export const gameAtom = atom<GameModel | null>({
  key: 'gameAtom',
  default: null,
  effects: [localStorageEffect('game')]
})

export const gameIsStarted = selector<boolean>({
  key: 'gameStarted',
  get: ({get}) => {
    const currentGame = get(gameAtom);
    return currentGame?.status === GameStatusModel.NOT_FINISHED
  },
})

export const gameIsFinished = selector<boolean>({
  key: 'gameFinished',
  get: ({get}) => {
    const currentGame = get(gameAtom);
    return currentGame?.status !== GameStatusModel.NOT_FINISHED
  },
})

export const isMyTurnSelector = selector<boolean>({
  key: 'isMyTurnSelector',
  get: ({get}) => {

    const currentGame = get(gameAtom)
    const me = get(currentUserAtom)
    const len = currentGame?.board.fields.length

    if (len === 0) {
      return me.user?.id === currentGame?.playerX
    }

    if (len){
      const lastTurn = currentGame?.board.fields[len - 1]
      if (me.user?.id === currentGame?.playerX) {
        return lastTurn === Mark.O;
      }
      else {
        return lastTurn === Mark.X;
      }
    }

    return false
  },
})

export const gamesHistoryAtom = atom<GameModel[]>({
  key: 'gamesHistoryAtom',
  default: [],
  effects: [localStorageEffect('gamesHistoryAtom')]
})