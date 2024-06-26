import { IModalConfigProps } from '../interfaces/Modal'

export const loadConfig = (file: string, type: string, action: (data: object) => void, defaultData: object): IModalConfigProps => {
  const modalFallbackConfig: IModalConfigProps = {
    fields: [],
    title: `Archivo ${file} no encontrado en las configuraciones del modal`,
    action: {
      name: 'Modal demo',
      action: (data: { [key: string]: string | boolean }) => alert(data)
    },
    cancel: {
      name: 'Cancel'
    }
  }

  const sectionSelector: (type: string, defaultData: object, action: (data: object) => void) => IModalConfigProps = require(`../config/${file}.config`).default
  const modalConfig = sectionSelector(type, defaultData, action)
  return modalConfig ?? modalFallbackConfig
}
