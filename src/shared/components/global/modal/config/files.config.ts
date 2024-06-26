import { IFile } from '@interfaces/model/files/Files'
import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'

export interface DefaultProps extends Partial<IFile> {}

export interface IModalResult {
  fileId?: string;
  fileType: string;
  file: Array<File>;
}

export interface IFilesModal {
  'default': IModalConfigLoader<DefaultProps, IModalResult>;
}

const filesModal: IFilesModal = {
  default: ({ fileId, ...props }, action): IModalConfigProps => {
    const config: IModalConfigProps = {
      reservedData: { fileId },
      fields: [
        {
          elementType: 'upload',
          name: 'file',
          accept: 'image/*, video/*',
          read: false,
          validation: {
            required: true,
            message: 'Please provide a valid attached file'
          }
        }
      ],
      title: `Attach File`,
      action: {
        name: `Save`,
        action
      },
      cancel: {
        name: 'Cancel'
      }
    }
    return config
  }
}

export default filesModal
