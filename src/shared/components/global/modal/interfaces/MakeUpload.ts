import { IField, IFieldProps } from './Field'

export interface IMakeUpload extends Omit<IField, 'defaultValue'> {
  elementType: 'upload';
  helpText?: string;
  read: boolean;
  image?: boolean;
  accept?:string;
}

export interface IMakeUploadProps extends IFieldProps {
  element: IMakeUpload
}
