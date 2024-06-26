import { IField, IFieldProps } from '@components/global/modal/interfaces/Field'

export interface IMakeToggle extends IField{
  elementType: 'toggle'
}

export interface IMakeToggleProps extends IFieldProps {
  element: IMakeToggle
}
