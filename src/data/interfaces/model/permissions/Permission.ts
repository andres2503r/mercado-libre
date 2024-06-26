export interface IPermission {
  permissionId: string;
  permissionName: string;
  permissionDescription: string;
  permissionState: boolean;
}

export type IPermissionStorage = {
  state: boolean;
  errorCounter: number;
  list: Map<string, IPermission>;
}

export interface IPermissionModel {
  permissionsStorage: IPermissionStorage;
  readPermissions: () => Promise<void>;
}
