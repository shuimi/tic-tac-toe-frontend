import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosPublic.interceptors.request.use(
  (config) => {
    const currentUser = localStorage.getItem('CurrentUser')

    console.log(currentUser)

    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser)
        if (config?.headers) {
          config.headers['access-token'] = `Bearer ${userData.accessToken}`
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    return config
  },
  (error) => {

    return Promise.reject(error)
  }
)

axiosPublic.interceptors.response.use(
  (response) => {

    return response
  },
  (error) => {

    return Promise.reject(error)
  }
)