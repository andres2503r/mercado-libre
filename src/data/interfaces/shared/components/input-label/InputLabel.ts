import { HTMLInputTypeAttribute, ChangeEvent } from 'react'

type variants = 'flat' | 'bordered' | 'underlined'| 'faded'

type sizes = 'sm' | 'md' | 'lg'

type radius = 'full' | 'lg' | 'md' | 'sm' | 'none'

type placements = 'inside'|'outside'| 'outside-left'

export interface classNames {
  base?: string;
  description?: string;
  errorMessage?: string;
  helperWrapper?: string;
  innerWrapper?: string;
  input?: string;
  inputWrapper?: string;
  label?: string;
  mainWrapper?: string;
  clearButton?: string;
}

export interface IInputLabel {

  id?: string;
  description?: string;
  placement?: placements;
  radius?: radius;
  classNames?: classNames;
  size?: sizes;
  variant?: variants;
  color?:string;
  isClearable?: boolean;
  isRequired?: boolean;
  name: string;
  readOnly?: boolean;
  label?: string;
  value?: string;
  placeholder?:string;
  endContent?: JSX.Element;
  type?: HTMLInputTypeAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  startContent?: JSX.Element
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}
