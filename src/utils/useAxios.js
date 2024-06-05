import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from 'src/context/AuthContext'
import baseurl from "src/utils/baseurl"
import crypto from 'crypto-js';
import apiKey from "src/utils/apikey"

const baseURL = baseurl()

const UseAxios = () => {
  const apikey = apiKey()
  const hash = crypto.SHA256(apikey).toString(); 

  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext)
  // console.log(authTokens)
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` , 'x-api-key' : apikey},
  })

  axiosInstance.interceptors.request.use(async (req) => {
    try{
    const user = jwt_decode(authTokens?.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/api/login/refresh/`, {
      refresh: authTokens?.refresh,
    })
    console.log(response.data)
    localStorage.setItem('authTokens', JSON.stringify(response.data))

    setAuthTokens(response.data)
    setUser(jwt_decode(response.data.access))

    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
  }catch (error) {
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

  return axiosInstance
}

export default UseAxios
