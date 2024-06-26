import { ReactNode } from 'react'

type Types = 'button' | 'reset' | 'submit'
type Sizes = 'sm' | 'md' | 'lg'
type Radius = 'full' | 'lg' | 'md' | 'sm' | 'none'
type Colors = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
type Variants = 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow'

export interface IButton {
  isIconOnly?: boolean;
  color?: Colors;
  sizes?: Sizes;
  radius?: Radius;
  disabled?: boolean;
  variant?: Variants;
  text?: string;
  type?: Types
  onClick?: () => void;
  required?:string;
  className?: string;
  endContent?: ReactNode;
  startContent?: ReactNode;
  children?: ReactNode;
  tooltip?: string;
}

export interface IButtonsGrid {
  icon: JSX.Element;
  tooltip?: string;
  onClick: () => void;
}
