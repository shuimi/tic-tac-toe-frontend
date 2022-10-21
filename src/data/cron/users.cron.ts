import { UsersService } from "../services/http/users";
import { cron } from "./index";

const userPingTask = async () => {
  await UsersService.ping()
}


export const userPingCron = cron(userPingTask, 15 * 1000)
