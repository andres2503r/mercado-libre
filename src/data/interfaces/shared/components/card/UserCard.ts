import { IUser } from '@interfaces/core/auth/User'
import { ReactNode } from 'react'

export interface IUserCard {
  edit?: () => void;
  data: IUser;
  children?: ReactNode;
}
