import React from 'react'

export interface IGlobalContext {
  [key: string]: any
}

export interface IGlobalState {
  children: React.ReactNode
}

export interface IGlobalStateAction{
  key: string;
  value: any;
}

export interface IGlobalStorage<T> {
  storage: T;
  updateStorage: (payload: T) => void
}
