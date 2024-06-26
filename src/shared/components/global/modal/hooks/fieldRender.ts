import { useCallback, useMemo, useState } from 'react'
import { IField, IFieldProps } from '../interfaces/Field'
import { IModalLiveDataCondition, IModalRenderCondition } from '../interfaces/Modal'
import { IOption, IOptionMultiSelect } from '@interfaces/global/Option'

export type IFormData = Record<string, any>

export interface IWatchEvent {
  name: string | undefined;
  type: string | undefined;
}

export interface IFieldRender {
  render: boolean;
  enable: boolean;
  checkField: (formData: IFormData, { name, type }: IWatchEvent) => void;
  liveData?: Array<IOption> | Array<IOptionMultiSelect>;
  liveSearching?: boolean;
}
export interface IFieldRenderProps extends Pick<IFieldProps, 'setValue'> {
  element: Partial<Pick<IField, 'enableIf'|'renderIf'|'name' | 'defaultValue' >>
        & Partial<Record<'liveData', IModalLiveDataCondition>>
}

export const useFieldRender = (props: IFieldRenderProps): IFieldRender => {
  const renderCondition = Boolean(props.element.renderIf)
  const enableCondition = Boolean(props.element.enableIf)
  const liveDataCondition = Boolean(props.element.liveData)
  const [render, setRender] = useState<boolean>(!renderCondition)
  const [enable, setEnable] = useState<boolean>(!enableCondition)
  const [liveSearching, setLiveSearching] = useState<boolean>(false)
  const [liveData, setLiveData] = useState<IOption[] | Array<IOptionMultiSelect> | undefined>(undefined)

  const renderConditionList: Array<string> = useMemo(() => {
    return renderCondition ? Object.keys(props.element.renderIf as IModalRenderCondition) : []
  }, [props.element.renderIf, renderCondition])

  const enableConditionList: Array<string> = useMemo(() => {
    return enableCondition ? Object.keys(props.element.enableIf as IModalRenderCondition) : []
  }, [enableCondition, props.element.enableIf])

  const liveDataAction = useCallback(
    async (field: string | Array<any>, formData: IFormData) => {
      if (typeof field === 'string' && props.element.liveData?.action) {
        const options = props.element.liveData.action(field, formData)
        return options ?? []
      }
      return [] as IOption[] | IOptionMultiSelect[]
    }, [props.element.liveData]
  )

  const checkField = useCallback(
    async (formData: IFormData, { name, type }: IWatchEvent) => {
      const key: string = name ?? ''
      const targetField: string = formData[key]

      if (renderCondition && renderConditionList.includes(key)) {
        const renderStatus: boolean = (props.element.renderIf as IModalRenderCondition)[key].includes(targetField.toString())
        setRender(renderStatus)
      } else if (enableCondition && enableConditionList.includes(key)) {
        const enableStatus: boolean = (props.element.enableIf as IModalRenderCondition)[key].includes(targetField.toString())
        setEnable(enableStatus)
      }
      if (liveDataCondition && key === props.element.liveData?.condition) {
        if (targetField) {
          setLiveSearching(true)
          const options: Array<IOption> | Array<IOptionMultiSelect> = await liveDataAction(targetField, formData)
          if (liveData && JSON.stringify(liveData) !== JSON.stringify(options)) { props.setValue(props.element.name as string, props.element.defaultValue) }
          setLiveData(options)
          setLiveSearching(false)
        }
      }
    }, [enableCondition, enableConditionList, liveData, liveDataAction, liveDataCondition, props, renderCondition, renderConditionList]
  )

  return {
    render,
    enable,
    checkField,
    liveData,
    liveSearching
  }
}
