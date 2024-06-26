import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IOption } from '@interfaces/global/Option'
import { IConfiguration } from '@interfaces/model/configurations/Configurations'

export interface DefaultConfigurationProps extends Partial<Omit<IConfiguration, 'configStatus'>> {
  configStatus?: string;
  fileList: Array<IOption>;
}

export interface IModalConfigurationResult {
  configId?: string;
  fileId: string;
  fileTime?: string;
  configOrder: number;
  configType:string
  configWidth?:string
  configHeight?:string
}

export interface IConfigutarionModal {
  'default': IModalConfigLoader<DefaultConfigurationProps, IModalConfigurationResult>;
  'state': IModalConfigLoader<IConfiguration, IConfiguration>;
}

const configurationModal: IConfigutarionModal = {
  default: ({ configId, ...props }, action): IModalConfigProps => {
    const modalAction: string = !configId ? 'Create' : 'Update'
    const config: IModalConfigProps = {
      reservedData: {
        configId
      },
      fields: [
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'select',
              label: 'File Type',
              defaultValue: props.configType ? props.configType : '',
              name: 'configType',
              options: [
                { id: 'image/video', name: 'Image/Video' },
                { id: 'page', name: 'Page' },
                { id: 'mosaic', name: 'Mosaic' }
              ],
              validation: {
                required: true,
                message: 'File Type is required'
              }
            },
            {
              elementType: 'input',
              label: 'Title config',
              defaultValue: props.configTitle ? props.configTitle : '',
              name: 'configTitle',
              renderIf: {
                configType: ['page', 'mosaic']
              },
              validation: {
                required: true
              }
            }
          ]
        },
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              label: 'Width',
              defaultValue: props.configWidth ? props.configWidth : '',
              name: 'configWidth',
              renderIf: {
                configType: ['page']
              },
              validation: {
                required: false
              }
            },
            {
              elementType: 'input',
              label: 'Height',
              defaultValue: props.configHeight ? props.configHeight : '',
              name: 'configHeight',
              renderIf: {
                configType: ['page']
              },
              validation: {
                required: false
              }
            }
          ]
        },
        {
          elementType: 'input',
          label: 'URL',
          defaultValue: props.configUrl ? props.configUrl : '',
          name: 'configUrl',
          renderIf: {
            configType: ['page']
          },
          validation: {
            required: true,
            message: 'URL is required'
          }
        },
        {
          elementType: 'select',
          label: 'File',
          defaultValue: props.files && props.files.length > 0 ? props.files[0].file.fileId : '',
          name: 'files',
          options: props.fileList,
          renderIf: {
            configType: ['image/video']
          },
          validation: {
            required: true,
            message: 'File is required'
          }
        },
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              type: 'text',
              label: 'Time',
              defaultValue: props.configTime,
              placeHolder: 'hh:mm:ss',
              name: 'configTime',
              renderIf: {
                configType: ['image/video', 'page', 'mosaic']
              },
              validation: {
                required: false,
                regex: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                message: 'Invalid file time'
              }
            },
            {
              elementType: 'input',
              label: 'Order',
              type: 'number',
              defaultValue: props.configOrder ? props.configOrder.toString() : '',
              name: 'configOrder',
              renderIf: {
                configType: ['image/video', 'page', 'mosaic']
              },
              validation: {
                required: true,
                regex: /^[1-9]\d*$/,
                message: 'Order is invalid'
                // message: props.configOrder <= 0 ? 'Order is invalid' : 'Order is required'
              }
            }
          ]
        }
      ],
      title: `${modalAction} configuration file`,
      action: {
        name: `${modalAction}`,
        action
      },
      cancel: {
        name: 'Cancel'
      }
    }
    return config
  },
  state: (props, action): IModalConfigProps => {
    return {
      reservedData: {
        ...props
      },
      fields: [
        {
          elementType: 'text',
          text: `Are you sure you want to update configuration file`,
          name: 'configStatus',
          validation: {
            required: false
          }
        }
      ],
      title: `Update configuration file`,
      action: {
        name: 'Update',
        action
      },
      cancel: { name: 'Cancel' }
    }
  }

}

export default configurationModal
