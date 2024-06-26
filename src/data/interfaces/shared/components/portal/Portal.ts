import { ReactNode } from 'react'

export interface IPortal {
  children: ReactNode;
  closeTime: number;
  portalOpen: boolean;
  portalTag?: string;
}
