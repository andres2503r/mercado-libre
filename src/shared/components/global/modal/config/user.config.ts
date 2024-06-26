import { IUser } from '@interfaces/core/auth/User'
import { IModalConfigLoader, IModalConfigProps } from '../interfaces/Modal'
import { IOption } from '@interfaces/global/Option'

export interface DefaultUserProps extends Partial<IUser> {
  rolesList: Array<IOption>;
}

export interface IModalUserResult {
  userId: string;
  roleId: string;
  userFullName: string;
  userLastName: string;
  username: string;
  userEmail: string;
  userPassword: string;
  newPassword?: string;
  confirmPassword: string;
  userState: boolean;
}

export interface IUserModal {
  'default': IModalConfigLoader<DefaultUserProps, IModalUserResult>;
  'state': IModalConfigLoader<Pick<DefaultUserProps, 'userId' | 'userState'>, Pick<IModalUserResult, 'userId' | 'userState'>>;
  'restore': IModalConfigLoader<Pick<DefaultUserProps, 'userId'>, Pick<IModalUserResult, 'newPassword' | 'confirmPassword' | 'userId'>>;
}

const userModal: IUserModal = {
  default: ({ userId, ...props }, action): IModalConfigProps => {
    const modalAction: string = !userId ? 'Create' : 'Update'
    const config: IModalConfigProps = {
      reservedData: {
        userId
      },
      fields: [
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              label: 'Full Name',
              defaultValue: props.userFullName,
              name: 'userFullName',
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
              elementType: 'input',
              label: 'Last Name',
              defaultValue: props.userLastName,
              name: 'userLastName',
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
            }
          ]
        },
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              label: 'Username',
              defaultValue: props.username,
              name: 'username',
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
              elementType: 'select',
              label: 'Role',
              defaultValue: props.role?.roleId ? props.role?.roleId : '',
              name: 'roleId',
              options: props.rolesList,
              validation: {
                required: true,
                message: 'Role is required'
                // regex: regexInput.select
              }
            }
          ]
        },
        {
          elementType: 'group',
          groups: [
            {
              elementType: 'input',
              label: 'Email',
              defaultValue: props.userEmail,
              name: 'userEmail',
              placeHolder: 'user@email.com',
              validation: {
                required: true,
                regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email is invalid.'
              }
            },
            {
              elementType: 'input',
              label: 'Password',
              name: 'userPassword',
              type: 'password',
              validation: {
                required: false,
                regex: /^(?!\s)(?=.*[a-zA-Z0-9]).{5,46}$/,
                message: 'Password is valid',
                minCharacters: {
                  value: 5,
                  message: 'Minimum 5 characters'
                },
                maxCharacters: {
                  value: 46,
                  message: 'Maximum 46 characters'
                }
              }

            }
          ]
        },
        {
          elementType: 'input',
          label: 'New Password',
          name: 'newPassword',
          type: 'password',
          validation: {
            required: false,
            regex: /^(?!\s)(?=.*[a-zA-Z0-9]).{5,46}$/,
            message: 'Password is valid',
            minCharacters: {
              value: 5,
              message: 'Minimum 5 characters'
            },
            maxCharacters: {
              value: 46,
              message: 'Maximum 46 characters'
            }
          }
        }
      ],
      title: `${modalAction} user`,
      action: {
        name: `${modalAction}`,
        action
      },
      cancel: {
        name: 'Cancel'
      }
    }
    if (!userId) delete config.fields[3]
    return config
  },
  state: ({ userId, userState }, action): IModalConfigProps => {
    return {
      reservedData: {
        userId,
        userState
      },
      fields: [
        {
          elementType: 'text',
          text: `Are you sure you want to update the user's state?`,
          name: 'userState',
          validation: {
            required: false
          }
        }
      ],
      title: `Update user state`,
      action: {
        name: 'Update',
        action
      },
      cancel: { name: 'Cancel' }
    }
  },
  restore: ({ userId }, action): IModalConfigProps => {
    return {
      reservedData: {
        userId
      },
      fields: [
        {
          elementType: 'input',
          label: 'New User Password',
          name: 'newPassword',
          type: 'password',
          validation: {
            required: true,
            // regex: regexInput.noBlankSpaces.allCharacters,
            message: 'Invalid new password'
          }
        },
        {
          elementType: 'input',
          label: 'Enter Your Password',
          name: 'confirmPassword',
          type: 'password',
          validation: {
            required: true,
            // regex: regexInput.noBlankSpaces.allCharacters,
            message: 'Invalid password confirmation'
          }
        }
      ],
      title: `Restore password`,
      action: {
        name: 'Save Password',
        action
      },
      cancel: { name: 'Cancel' }
    }
  }
}

export default userModal
