import { UserModel } from "../../../models";


export interface AuthAtomModel {
  user: UserModel | null,
  accessToken: string,
}