import { ChangeEventHandler, CSSProperties, ReactNode } from 'react'

type Sizes = 'sm' | 'md' | 'lg'

export interface classNames {
  base?: string;
  wrapper?:string
}

export interface IToggle {
  state: boolean;
  name: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
  classNames?: classNames;
  label?: string;
  styles?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  tooltip?: string;
  startContent?: ReactNode;
  size?: Sizes;
}
