import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import baseurl from "src/utils/baseurl"
import crypto from 'crypto-js';
import apiKey from "src/utils/apikey"


const baseURL = baseurl()

const apikey = apiKey()

const hash = crypto.SHA256(apikey).toString(); 

let authTokens = sessionStorage.getItem('authTokens')
  ? JSON.parse(sessionStorage.getItem('authTokens'))
  : null

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` , 'x-api-key' : apikey },
})

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = sessionStorage.getItem('authTokens')
      ? JSON.parse(sessionStorage.getItem('authTokens'))
      : null
    req.headers.Authorization = `Bearer ${authTokens?.access}`
  }
  
  try
  {
    const user = jwt_decode(authTokens?.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/login/refresh/`, {
      refresh: authTokens.refresh,
    })

    sessionStorage.setItem('authTokens', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
  } catch (error) {
    if (error.name === 'InvalidTokenError') {
      // Handle the InvalidTokenError
      console.log('Invalid token specified:', error.message);
      // Perform any necessary actions, such as redirecting the user or displaying an error message
    } else {
      // Handle other types of errors
      console.log('An error occurred:', error.message);
    }
  }
})

export default axiosInstance
