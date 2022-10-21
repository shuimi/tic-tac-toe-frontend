import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosPublic.interceptors.request.use(
  (config) => {

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