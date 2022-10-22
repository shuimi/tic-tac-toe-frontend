import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
})

const getToken = () => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken
}

axiosPublic.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token != null) {
      config.headers['Authorization'] = `Bearer ${token}`
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
    // const currentUser = localStorage.getItem('CurrentUser')
    // if (currentUser) {
    //   if (error.response.status === 403) {
    //     localStorage.clear()
    //     window.location.replace('/')
    //   }
    // }
    return Promise.reject(error)
  }
)