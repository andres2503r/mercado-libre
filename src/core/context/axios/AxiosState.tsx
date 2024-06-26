import React, { FC, useContext } from 'react'
import Axios, { AxiosInstance } from 'axios'
import AxiosContext from './AxiosContext'
import { readItem } from '../../../shared/tools/local-storage/localStorage'
import { IAxiosState } from '@interfaces/context/axios/Axios'

const AxiosState: FC<IAxiosState> = (props) => {

  const axios: AxiosInstance = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL, timeout: 600000 })

  axios.interceptors.request.use(
    config => {
      const token = readItem(process.env.NEXT_PUBLIC_SESSION_TOKEN as string, false)
      if (token) {
        if (config.headers) config.headers['x-token'] = token
      }
      if (!config.data) return config

      const data: any = config.data
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) delete data[key]
        if (typeof value === 'string' && value === '') delete data[key]
      })
      config.data = data

      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(response => {
    return response
  }, (error) => {
    if (error.response.status === 401) console.log('error 401')
    return Promise.reject(error)
  })

  return (
    <AxiosContext.Provider value={axios}>
      {props.children}
    </AxiosContext.Provider>
  )
}

export default AxiosState
