import { CSSProperties } from 'react'
import { IMakeSelect } from './MakeSelect'
import { IMakeTextarea } from './MakeTextarea'
import { IMakeToggle } from './MakeToggle'
import { IMakeMultiSelect } from './MakeMultiSelect'
import { IMakeFieldGroup } from './MakeFieldGroup'
import { IMakeText } from './MakeText'
import { IOption, IOptionMultiSelect } from '@interfaces/global/Option'
import { IMakeInput } from './MakeField'
import { IMakeUpload } from './MakeUpload'

export type IModalField = IMakeSelect | IMakeInput | IMakeFieldGroup | IMakeTextarea | IMakeToggle | IMakeMultiSelect | IMakeText | IMakeUpload

export type IModalRenderCondition = Record<string, Array<string | number>>

export type IModalLiveDataCondition = {
  action: (data: string, ...args: any[]) => Promise<Array<IOption> | Array<IOptionMultiSelect>> | Array<IOption | IOptionMultiSelect>;
  condition: string
}

export interface IModalConfigProps {
  fields: Array<IModalField>;
  title: string;
  action: {
    name: string;
    action?: (data: any) => void;
    hide?: boolean;
  }
  cancel: {
    name?: string;
    action?: () => void
    hide?: boolean;
  }
  reservedData?: any
  styles?: CSSProperties;
  overFlowBody?: string | number
  minHeightBody?: string | number
}

export type IModalConfigLoader<T = any, D = Record<string, string>> = (props: T, action: (modalResult: D) => void) => IModalConfigProps

export interface IModal {
  open: boolean;
  close: () => void;
  config: IModalConfigProps;
}

export type IFormData = Record<string, any>

export interface IWachEvent {
  name?: string;
  type?: string;
}
