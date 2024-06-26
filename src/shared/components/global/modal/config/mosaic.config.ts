import { IMosaic } from '@interfaces/model/mosaic/Mosaic'
import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IOption } from '@interfaces/global/Option'

export interface DefaultMosaicProps extends Partial<IMosaic> {
  fileList: Array<IOption>;
}

export interface IModalMosaicResult {
  configId?: string;
  fileId: string;
  fileOrder: number;
  configFileId?:any
}

export interface IMosaicModal {
  'default': IModalConfigLoader<DefaultMosaicProps, IModalMosaicResult>;
}

const mosaicModal: IMosaicModal = {
  default: ({ configFileId, file, ...props }, action): IModalConfigProps => {
    const modalAction: string = !configFileId ? 'Add' : 'Update'
    const config: IModalConfigProps = {
      reservedData: {
        configFileId
      },
      fields: [
        {
          elementType: 'select',
          label: 'File',
          defaultValue: file?.fileId,
          name: 'file',
          options: props.fileList,
          validation: {
            required: true,
            message: 'File is required'
          }
        },
        {
          elementType: 'input',
          label: 'Order',
          type: 'number',
          defaultValue: props.fileOrder ? props.fileOrder.toString() : '',
          name: 'fileOrder',
          validation: {
            required: true,
            regex: /^[1-9]\d*$/,
            message: 'Order is invalid'
            // message: props.configOrder <= 0 ? 'Order is invalid' : 'Order is required'
          }
        }
      ],
      title: `Add file mosaic`,
      action: {
        name: `${modalAction}`,
        action
      },
      cancel: {
        name: 'Cancel'
      }
    }
    return config
  }

}

export default mosaicModal
