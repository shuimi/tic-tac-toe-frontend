export enum PlaygroundMark {
  VOID,
  CROSS,
  ZERO
}

export interface PlaygroundCell {
  position: number,
  mark: PlaygroundMark,
  protected?: boolean,
}

export interface Playground {
  rank: number,
  data: PlaygroundCell[]
}