import { BoardModel } from "./board.model";
import { GameStatusModel } from "./game-status.model";
import { MoveModel } from "./move.model";

export interface GameModel {
  id: string,
  playerX: number,
  playerO: number,
  board: BoardModel,
  status: GameStatusModel,
  takeBacksLeft: number,
  moves: MoveModel[],
  startDate: string,
  finishDate: string,
  version: number,
}