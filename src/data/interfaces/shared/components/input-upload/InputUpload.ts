import { ChangeEvent, CSSProperties } from 'react'

export interface IFile {
  data?: string
  name: string;
  size: number;
}
export interface IInputState {
  state: boolean;
  file: IFile
}

export interface IInputStorage {
  setData: (file: IInputState) => void;
  clearFuntion: () => void;
}
export interface IInputUpload {
  id?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?:string;
  label?: String
  helpText?: String
  clearfunction?: () => void;
  style?:CSSProperties;
  name: string;
  disabled?: boolean;
  read?: boolean;
}
