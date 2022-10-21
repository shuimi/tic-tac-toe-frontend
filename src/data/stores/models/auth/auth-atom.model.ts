import { UserModel } from "../../../models";


export interface AuthAtomModel {
  user: UserModel,
  accessToken: string,
}