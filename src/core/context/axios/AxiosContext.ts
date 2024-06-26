import { Context, createContext } from 'react'
import Axios, { AxiosInstance } from 'axios'

const AxiosContext: Context<AxiosInstance> = createContext<AxiosInstance>(Axios)

export default AxiosContext
