export enum Mark {
  VOID,
  CROSS,
  ZERO
}

export interface Cell {
  position: number,
  mark: Mark,
  protected?: boolean,
}

export interface Playground {
  rank: number,
  data: Cell[]
}