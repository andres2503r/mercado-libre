import { HTMLInputTypeAttribute } from 'react'
import { IField, IFieldProps } from './Field'

export interface IMakeInput extends IField {
  elementType: 'input'
  placeHolder?: string
  type?: HTMLInputTypeAttribute
}

export interface IMakeInputProps extends IFieldProps {
  element: IMakeInput
}
