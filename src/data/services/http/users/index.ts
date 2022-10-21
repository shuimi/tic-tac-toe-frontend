import { axiosPublic } from "../http.client";
import { AxiosResponse } from "axios";
import { UserModel } from "../../../models";

export class UsersService {
  public static async getAll(): Promise<AxiosResponse<UserModel[]>> {
    return axiosPublic.get('/users')
  }

  public static async getOneById(userId: number): Promise<AxiosResponse<UserModel>> {
    return axiosPublic.get(`/users/${userId}`)
  }

  public static async getByUsername(username: string): Promise<AxiosResponse<UserModel[]>> {
    return axiosPublic.get(`/users/username`, {
      params: {
        username: username
      }
    })
  }

  public static async ping(): Promise<AxiosResponse<{}>> {
    return axiosPublic.get('/ping')
  }

  public static async getMe(): Promise<AxiosResponse<UserModel>> {
    return axiosPublic.get('/me')
  }
}