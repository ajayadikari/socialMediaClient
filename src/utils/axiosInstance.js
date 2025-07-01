'use client'

import server from './constants'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const useCreateAxiosInstance = () => {
  const router = useRouter()
  const axiosInstance = axios.create({
    "baseURL": server
  })

  axiosInstance.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem("access")
    req.headers.Authorization = `Bearer ${accessToken}`
    return req
  })

  axiosInstance.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._alreadytried) {
      try {
        originalRequest._alreadytried = true

        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) {
          router.push('/auth')
          toast.error("please login!")
          return Promise.reject(error)
        }

        const res = await axios({
          "method": "POST",
          "url": `${server}api/token/verify/`,
          data: {
            token: refreshToken
          }
        })

        if (res.status !== 200) {
          router.push('/auth')
          toast.error("login expired!")
          return Promise.reject(error)
        }

        const refreshRes = await axios({
          "method": "post",
          "url": `${server}api/token/refresh/`,
          data: {
            refresh: refreshToken
          }
        })

        if (refreshRes.status !== 200) {
          router.push("/auth")
          toast.error("login expired!")
          return Promise.reject(error)
        }

        const newAccessToken = refreshRes.data["access"]
        localStorage.setItem("access", newAccessToken)

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return await axiosInstance(originalRequest)
      }
      catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
  )
  return axiosInstance
}


// const axiosInstance = axios.create({
//   baseURL: server
// });

// const setAuthToken = async (req) => {
//   const token = await localStorage.getItem('access')
//   if (token) {
//     req.headers['Authorization'] = `Bearer ${token}`
//   } else {
//     console.log("token not found")
//     toast.error("unable to proccess request")
//     throw "token not found"
//   }
//   return req
// }

// const reqFailed = (res) => {
//   if (res.status !== 200) console.log("req failed possibly token expired")
//   return res
// }

// axiosInstance.interceptors.request.use((req) => setAuthToken(req), (err) => {
//   return Promies.reject(err)
// })


// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized: Possibly expired token.");
//       toast.error("Session expired. Please log in again.");
//     }
//     return Promise.reject(error);
//   }
// );


// export default axiosInstance
export default useCreateAxiosInstance 