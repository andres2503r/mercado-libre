import { CSSProperties } from 'react'
import { Control, FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IOption, IOptionMultiSelect } from '@interfaces/global/Option'

export interface IFieldLiveData {
  action: (data: string, ...args: any[]) => Promise<Array<IOption> | Array<IOptionMultiSelect>>;
  condition: string
}

export type ICharacterSize = {
  value: number;
  message: string;
}

export interface IField {
  name: string
  id?: string
  label?: string
  styles?: CSSProperties;
  defaultValue?: string
  renderIf?: Record<string, Array<string | number>>
  enableIf?: Record<string, Array<string | number>>
  validation: {
    required: boolean
    regex?: RegExp
    message?: string
    maxCharacters?: ICharacterSize
    minCharacters?: ICharacterSize
  }
  disabled?: boolean
}

export interface IFieldProps {
  control: Control<FieldValues, any>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>
}
