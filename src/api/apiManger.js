import axios, { AxiosError } from 'axios'
import { gitlab_endpoint, local_endpoint } from '../lib/constants'


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
      const token = process.env.REACT_APP_GIT_TOKEN
      if (token) {
        req.headers = {
          ...req.headers,
          Authorization: token,
        }
        return req
      }
      return Promise.reject(new Error('INVALID_ID_TOKEN'))
    })
    instance.interceptors.response.use(
      res => {
        return res
      },
      (err) => {
        return Promise.reject(err)
      },
    )
  }

  return instance
}

export const gitLabInstance = createInstance({
  endpoint: gitlab_endpoint,
  withToken: true,
})

export const publicInstance = createInstance({
  endpoint: local_endpoint,
})