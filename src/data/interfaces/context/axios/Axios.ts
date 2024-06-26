import { ReactNode } from 'react'

export interface IAxiosState {
  children: ReactNode;
}

export interface IAxiosResponse<T> {
  results: T
}
