import { Mark } from "./mark.model";

export interface BoardModel {
  fields: Mark[],
  n: number,
  k: number,
}