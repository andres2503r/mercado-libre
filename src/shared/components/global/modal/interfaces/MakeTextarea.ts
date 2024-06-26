import { IField, IFieldProps } from '@components/global/modal/interfaces/Field'

export interface IMakeTextarea extends IField {
  elementType: 'textarea';
  cols?: number;
  rows?: number;
}

export interface IMakeTextareaProps extends IFieldProps {
  element: IMakeTextarea
}
