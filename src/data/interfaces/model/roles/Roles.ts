import { IPermission } from '../permissions/Permission'

export interface IRole {
  roleId: string;
  roleName: string;
  roleDescription: string;
  roleState: boolean;
  permissions: Array<IPermission>;
}

export type ICreateRole = Pick<IRole, 'roleName' | 'roleDescription' > & {
  permissions: Array<Pick<IPermission, 'permissionId'>>
  roleState?: boolean
}

export type IUpdateRole = Partial<Omit<ICreateRole, 'permissions'>> & {
  permissions: Array<Pick<IPermission, 'permissionId'>>
}

export type IRolePermissionBody = {
  permissions: Array<string>;
}

export type ISocketRole = IRole & {
  isDelete?: boolean
}

export type IRoleStorage = {
  state: boolean;
  errorCounter: number;
  roles: Map<string, IRole>;
}

export interface IRoleModel {
  rolesStorage: IRoleStorage;
  createRole: (role: ICreateRole) => Promise<void>;
  readRoles: () => Promise<void>;
  updateRole: (roleId: string, role: IUpdateRole) => Promise<void>;
  updateRoleState: (roleId: string, roleState: boolean) => Promise<void>;
  deleteRole: (roleId: string) => Promise<void>
}
