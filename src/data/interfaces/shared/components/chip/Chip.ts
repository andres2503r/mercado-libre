import { ReactNode } from 'react'

type Size = 'sm' | 'md' | 'lg';
type Radius = 'full' | 'lg' | 'md' | 'sm';
type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type CommonOptions = {
  size?: Size;
  radius?: Radius;
  variant?: Variant;
  color?: Color;
  classNames?: {
    base?: string;
    content?: string;
    closeButton?: string;
  };
}

export interface IChip extends CommonOptions {
  isDisabled?: boolean;
  text?: string;
  onClose?: () => void;
  className?: string;
  children?: ReactNode

}
