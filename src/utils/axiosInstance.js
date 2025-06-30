'use client'

import baseURL from './constants'
import axios from 'axios'
import { toast } from 'react-toastify';


const axiosInstance = axios.create({
    baseURL: baseURL
});

const setAuthToken = async (req) => {
    const token = await localStorage.getItem('access')
    if (token) {
        req.headers['Authorization'] = `Bearer ${token}`
    } else {
        console.log("token not found")
        toast.error("unable to proccess request")
        throw "token not found"
    }
    return req
}

const reqFailed = (res) => {
    if (res.status !== 200) console.log("req failed possibly token expired")
    return res
}

axiosInstance.interceptors.request.use((req) => setAuthToken(req), (err) => {
    return Promies.reject(err)
})


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: Possibly expired token.");
      toast.error("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);


export default axiosInstance