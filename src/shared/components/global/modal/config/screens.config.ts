import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IScreen } from '@interfaces/model/screens/Screens'

export interface DefaultScreenProps extends Partial<IScreen> {}

export interface IModalScreenResult {
  screenId?: string;
  screenIp: string;
  screenMac: string;
  screenName: string;
}

export type DefaultScreenStateProps = Pick<IScreen, 'screenId' | 'screenState'>

export interface IScreenModal {
  'default': IModalConfigLoader<DefaultScreenProps, IModalScreenResult>;
  'state': IModalConfigLoader<DefaultScreenStateProps, DefaultScreenStateProps>;
}

const screenModal: IScreenModal = {
  default: ({ screenId, ...props }, action): IModalConfigProps => {
    const modalAction: string = !screenId ? 'Create' : 'Update'
    return {
      reservedData: {
        screenId
      },
      fields: [
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              label: 'Name',
              defaultValue: props.screenName,
              name: 'screenName',
              validation: {
                required: true,
                message: 'The name of the screen is not valid'
              }
            },
            {
              elementType: 'input',
              label: 'IP',
              defaultValue: props.screenIp,
              name: 'screenIp',
              placeHolder: '192.168.1.1',
              validation: {
                required: true,
                regex: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                message: 'The IP of the screen is not valid'
              }
            }
          ]
        },
        {
          elementType: 'input',
          label: 'MAC',
          defaultValue: props.screenMac,
          name: 'screenMac',
          placeHolder: '00:1B:44:11:3A:B7',
          validation: {
            required: false,
            regex: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
            message: 'The MAC is not valid'
          }
        }
      ],
      title: `${modalAction} screen`,
      action: {
        name: `${modalAction}`,
        action
      },
      cancel: {
        name: 'Cancel'
      },
      styles: {
        maxWidth: '600px'
      }
    }
  },
  state: ({ screenId, screenState }, action): IModalConfigProps => {
    return {
      reservedData: {
        screenId,
        screenState
      },
      fields: [
        {
          elementType: 'text',
          text: `Are you sure you want to update the screen's state?`,
          name: 'screenState',
          validation: {
            required: false
          }
        }
      ],
      title: `Update screen state`,
      action: {
        name: 'Update',
        action
      },
      cancel: { name: 'Cancel' }
    }
  }
}

export default screenModal
