import { CSSProperties, ElementType } from 'react'

export type iconType = 'FiEdit2' | 'FiTrash2' | 'FiPlusCircle' | 'FiEye' | 'FiCheck' | 'FiX';

export interface IIcon {
  icon?: iconType;
  size?: number;
  styles?: CSSProperties;
  tooltip?: string;
  Icon?:ElementType;
}
