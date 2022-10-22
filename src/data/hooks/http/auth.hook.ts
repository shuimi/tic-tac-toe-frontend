import { AuthService, UsersService } from "../../services";
import { AuthenticationRequestModel, RegistrationRequestModel } from "../../models";
import { useRouting } from "../../../core/hooks/use-routing";
import { useState } from "react";
import { userPingCron } from "../../cron/users.cron";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../stores/atoms/auth";


export const useAuth = () => {

  const setCurrentUser = useSetRecoilState(currentUserAtom)
  const clearCurrentUser = useResetRecoilState(currentUserAtom)

  const [pending, setPending] = useState<boolean>(false)

  const routing = useRouting()

  const register = (dto: RegistrationRequestModel, onError?: () => void) => {
    setPending(true)
    AuthService.register(dto)
      .then(() => {
        const {username, password} = dto
        const loginDto = {
          login: username,
          password: password
        }
        login(loginDto, onError)
      })
      .catch(onError)
      .finally(() => setPending(false))
  }

  const login = (dto: AuthenticationRequestModel, onError?: () => void) => {
    setPending(true)
    AuthService.auth(dto)
      .then((result) => {
        const accessToken = result.data.accessToken
        localStorage.setItem('accessToken', accessToken)

        UsersService.getMe()
          .then(result => {
            const userData = result.data

            setCurrentUser({
              accessToken: accessToken,
              user: userData,
            })

          })
          .catch(onError)

        userPingCron.start()
        routing.go.root()
      })
      .catch(onError)
      .finally(() => setPending(false))
  }

  const logout = () => {
    userPingCron.stop()
    clearCurrentUser()
    routing.go.root()
  }

  return {
    pending,
    login,
    logout,
    register
  }
}