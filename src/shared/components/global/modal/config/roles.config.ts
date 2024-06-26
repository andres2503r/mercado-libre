import { IOption } from '@interfaces/global/Option'
import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IRole } from '@interfaces/model/roles/Roles'

export interface DefaultRoleProps extends Partial<IRole> {
  permissionList: Array<IOption>;
}

export interface IModalRoleResult {
  roleId?: string;
  permissions: Set<string>;
  roleDescription: string;
  roleName: string;
  roleState?: boolean;
}

export type IUpdateRoleState = Pick<IRole, 'roleId'| 'roleState'>

export interface IRoleModal {
  'default': IModalConfigLoader<DefaultRoleProps, IModalRoleResult>;
  'state': IModalConfigLoader<IUpdateRoleState, IUpdateRoleState>;
}

const roleModal: IRoleModal = {
  default: ({ roleId, roleState, ...props }, action): IModalConfigProps => {
    const modalAction: string = !roleId ? 'Create' : 'Update'
    return {
      reservedData: {
        roleId,
        roleState
      },
      fields: [
        {
          elementType: 'input',
          label: 'Name',
          defaultValue: props.roleName,
          name: 'roleName',
          validation: {
            required: true,
            regex: /^[a-zA-Z0-9_-]{3,16}$/,
            message: 'Name invalid',
            minCharacters: {
              value: 3,
              message: 'Minimum 3 characters'
            },
            maxCharacters: {
              value: 100,
              message: 'Maximum 100 characters'
            }
          }
        },
        {
          elementType: 'textarea',
          label: 'Description',
          defaultValue: props.roleDescription,
          name: 'roleDescription',

          validation: {
            required: true,
            message: 'Invalid description',
            minCharacters: {
              value: 8,
              message: 'Must be at least 8 characters long'
            },
            maxCharacters: {
              value: 100,
              message: 'Must be at most 100 characters long'
            }
          }
        },
        {
          elementType: 'multiselect',
          label: 'Permissions',
          name: 'permissions',
          options: props.permissionList,
          defaultValue: (props.permissions ?? []).map((e) => e.permissionId),
          validation: {
            required: true,
            message: 'Permissions required'
          }
        }
      ],
      title: `${modalAction} role`,
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
  state: ({ roleId, roleState }, action): IModalConfigProps => {
    return {
      reservedData: {
        roleId,
        roleState
      },
      fields: [
        {
          elementType: 'text',
          text: `Are you sure you want to update the role's state?`,
          name: 'roleState',
          validation: {
            required: false
          }
        }
      ],
      title: `Update role state`,
      action: {
        name: 'Update',
        action
      },
      cancel: { name: 'Cancel' }
    }
  }
}

export default roleModal
