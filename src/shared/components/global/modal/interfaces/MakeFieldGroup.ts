import { CSSProperties } from 'react'
import { IFieldProps } from './Field'
import { IModalField } from './Modal'

export interface IMakeFieldGroup {
  elementType: 'group';
  groups: Array<IModalField>;
  style?: CSSProperties;
}

export interface IMakeFieldGroupProps extends IFieldProps {
  element: IMakeFieldGroup;
}
