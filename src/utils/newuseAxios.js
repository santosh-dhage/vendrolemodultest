import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from 'src/context/AuthContext'
import baseurl from "src/utils/baseurl"
import crypto from 'crypto-js';
import apiKey from "src/utils/apikey"

const baseURL = baseurl()

const NewUseAxios = () => {
  const apikey = apiKey()
  const hash = crypto.SHA256(apikey).toString(); 
  const axiosInstance = axios.create({
    baseURL,
    headers: {'x-api-key' : apikey},
  })

  axiosInstance.interceptors.request.use(async (req) => {
    return req
  })

  return axiosInstance
}

export default NewUseAxios
