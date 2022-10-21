import { axiosPublic } from "../http.client";
import { GameModel, GameRequestModel, MoveModel } from "../../../models";
import { AxiosResponse } from "axios";

export class GameService {

  public static async create(enemyId: number, dto: GameRequestModel): Promise<AxiosResponse<GameModel>> {
    return axiosPublic.post<GameModel>(`/users/${enemyId}/play`, dto)
  }

  public static async getById(gameId: string): Promise<AxiosResponse<GameModel>>  {
    return axiosPublic.get<GameModel>(`/games/${gameId}`)
  }

  public static async move(gameId: string, dto: MoveModel): Promise<AxiosResponse<GameModel>> {
    return axiosPublic.post<GameModel>(`/games/${gameId}`, dto)
  }

  public static async getAllByUserId(userId: number): Promise<AxiosResponse<GameModel[]>> {
    return axiosPublic.get(`/users/${userId}/games`)
  }

  public static async getAll(): Promise<AxiosResponse<GameModel[]>> {
    return axiosPublic.get(`/me/games`)
  }

}