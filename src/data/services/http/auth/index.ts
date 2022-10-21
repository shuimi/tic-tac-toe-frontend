import { axiosPublic } from '../http.client'
import {
  AuthenticationRequestModel,
  AuthenticationResponseModel,
  RegistrationRequestModel
} from '../../../models'
import { AxiosResponse } from "axios";

export class AuthService {

  public static async register(dto: RegistrationRequestModel): Promise<AxiosResponse<{}>> {
    return axiosPublic.post('/register', dto)
  }

  public static async auth(dto: AuthenticationRequestModel): Promise<AxiosResponse<AuthenticationResponseModel>> {
    return axiosPublic.post<AuthenticationResponseModel>('/auth', dto)
  }

}