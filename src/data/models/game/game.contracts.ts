export enum GameType {
  CUSTOM = 'CUSTOM',
  GOMOKU = 'GOMOKU',
  CLASSIC = 'CLASSIC'
}

export enum Player {
  BOT,
  PLAYER
}

export enum GameStatus {
  UNFINISHED,
  FINISHED_WIN,
  FINISHED_LOSE,
  FINISHED_DRAW,
}

export interface GameHistory {
  id: string,
  rank: number,
  winCondition: number,
  firstTurn: Player,
  history: number[],
  lastPosition: number[],
  timestamp: string,
  status: GameStatus,
}