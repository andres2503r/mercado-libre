import { ChangeEvent, CSSProperties } from 'react'

export interface ITextarea {
  id?: string;
  label?: string;
  name?: string;
  cols?: number;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
  width? : string;
  height? : string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  background?: string;
  styles?: CSSProperties;
}
