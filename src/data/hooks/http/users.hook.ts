import { UsersService } from "../../services";
import { useSetRecoilState } from "recoil";
import { usersOnlineAtom } from "../../../view/pages/playground/store";
import { currentUserAtom } from "../../stores/atoms/auth";
import { UserModel } from "../../models";


export const useUsers = () => {

  const setUsersOnline = useSetRecoilState(usersOnlineAtom)
  const setCurrentUser = useSetRecoilState(currentUserAtom)

  const updateUsersOnline = () => {
    UsersService.getAll()
      .then(result => {
        setUsersOnline(result.data)
      })
  }

  const updateMe = (onUpdated?: (user: UserModel) => void) => {
    const currentUser = localStorage.getItem('CurrentUser')
    if (currentUser) {
      try {
        const token = JSON.parse(currentUser).accessToken
        UsersService.getMe()
          .then(result => {
            const userData = result.data
            setCurrentUser({
              accessToken: token,
              user: userData,
            })
            return userData
          })
          .then(onUpdated)
      }
      catch (error) {
        console.error(error)
      }
    }
  }

  return {
    updateUsersOnline,
    updateMe
  }
}