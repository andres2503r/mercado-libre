import { IOption } from '@interfaces/global/Option'
import { IField, IFieldProps } from './Field'
import { IModalLiveDataCondition } from './Modal'

export interface IMakeMultiSelect extends Omit<IField, 'defaultValue' | 'id'> {
  id?: string;
  elementType: 'multiselect';
  options: Array<IOption>;
  liveData?: IModalLiveDataCondition;
  defaultValue?: Array<string>
}

export interface IMakeMultiSelectProps extends IFieldProps {
  element: IMakeMultiSelect
}
