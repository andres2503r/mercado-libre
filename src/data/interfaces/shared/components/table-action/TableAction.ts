import { CSSProperties, ReactNode } from 'react'

type Variants = 'primary' | 'secondary' | 'shadow' | undefined;

export interface IButtonConfig {
  isIconOnly?: boolean;
  variant?: Variants;
  onClick?: () => void;
  endContent?: ReactNode;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  text?: ReactNode;
}

export interface ITableAction {
  buttons?: Array<IButtonConfig>;
  className?: CSSProperties;
}
