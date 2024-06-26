import { IField, IFieldProps } from '@components/global/modal/interfaces/Field'
import { CSSProperties } from 'react'

export interface IMakeText extends Omit<IField, 'type'>{
  elementType: 'text',
  text: string;
  textStyles?: CSSProperties
}

export interface IMakeTextProps extends IFieldProps {
  element: IMakeText
}
