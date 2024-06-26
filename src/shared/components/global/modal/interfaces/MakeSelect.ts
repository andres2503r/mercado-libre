import { IField, IFieldProps } from '@components/global/modal/interfaces/Field'
import { IModalLiveDataCondition } from './Modal'
import { IOption } from '@interfaces/global/Option'

export interface IMakeSelect extends IField {
  elementType: 'select';
  options: Array<IOption>
  defaultOption?: boolean
  defaultOptionName?: string
  liveData?: IModalLiveDataCondition
  // dynamicData?: boolean;
  // menuMaxHeight?: string
}

export interface IMakeSelectProps extends IFieldProps {
  element: IMakeSelect
}
