import { IUser } from '@interfaces/core/auth/User'
import { IRole } from '../roles/Roles'

export type ICreateUser = Omit<IUser, 'userId' | 'role' | 'userState'> &
  Partial<Pick<IUser, 'userState'>> &
  Pick<IRole, 'roleId'>;

export type IUpdateUser = Partial<ICreateUser> &
  Partial<Record<'newPassword', string>> &
  Partial<Record<'role', Pick<IRole, 'roleId'>>>;

export type IUserState = Pick<IUser, 'userState' >

export type IUserStorage = {
  state: boolean;
  users: Map<string, IUser>;
  errorCounter:number
}

export interface IRestorePassword {
  userId: string;
  newPassword: string;
  confirmPassword: string;
}

export type IUpdateUserState = Pick<IUser, 'userId'| 'userState'>

export interface IUserModel {
  usersStorage: IUserStorage;
  createUser: (user: ICreateUser) => Promise<void>;
  readUsers: () => Promise<void>;
  updateUser: (userId: string, userUpdate: IUpdateUser) => Promise<void>;
  updateUserState: (userId: string, state: boolean) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  deleteBulkUser: (idList: Array<string>) => Promise<void>;
  // restorePassword: (userId: string, restoreData: IRestorePassword) => Promise<void>;
}
