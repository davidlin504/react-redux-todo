import axios, { AxiosError } from 'axios'
import { endpoint } from '../lib/constants'

function createInstance({
  endpoint,
  withToken = false,
}) {
  const instance = axios.create({
    baseURL: endpoint,
    timeout: 60000,
  })

  instance.defaults.headers.common['Content-Type'] = 'application/json'

  if (withToken) {
    instance.interceptors.request.use(req => {
      const token = getIDToken()
      if (token) {
        req.headers = {
          ...req.headers,
          Authorization: token,
        }
        return req
      }
      return Promise.reject(new Error(INVALID_ID_TOKEN))
    })
    instance.interceptors.response.use(
      res => {
        const expiredStamp = res.data?.token_expired_stamp
        if (typeof expiredStamp === 'string') {
          updateExpiredStamp(expiredStamp)
          eventHub.dispatch(AppEvents.UpdateExpiredStamp, { expiredStamp })
        }
        return res
      },
      (err) => {
        if (
          err.response?.status === 401 &&
          (err.response?.data)?.message === 'Unauthorized'
        ) {
          eventHub.dispatch(AppEvents.Logout)
        }
        return Promise.reject(err.response)
      },
    )
  }

  return instance
}

export const publicInstance = createInstance({ endpoint })
