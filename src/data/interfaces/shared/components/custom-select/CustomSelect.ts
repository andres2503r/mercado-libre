import { IOption } from '@interfaces/global/Option'
import { ChangeEvent, CSSProperties } from 'react'

export interface ICustomSelectOption {
  option: IOption;
  selected?: IOption;
  onSelectHandler: (option: IOption) => void;
}

type labelPlacements = 'inside'|'outside'| 'outside-left'

type variants = 'flat' | 'bordered' | 'underlined'| 'faded'

type sizes = 'sm' | 'md' | 'lg'

type radius = 'full' | 'lg' | 'md' | 'sm' | 'none'

type selectionMode = 'multiple' | 'single' | 'none'

export interface classNames {
  base?: string;
  label?: string;
  trigger?: string;
  innerWrapper?: string;
  mainWrapper?: string;
  errorMessage?: string;
  selectorIcon?: string;
  value?: string;
  listboxWrapper?: string;
  listbox?: string;
  popoverContent?: string;
  helperWrapper?: string;
  description?: string;
}

export interface ICustomSelect {

  className?: string;
  selectionMode?: selectionMode
  description?: string;
  startContent?: JSX.Element;
  radius?: radius;
  isRequired?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  labelPlacement?: labelPlacements;
  variant?: variants;
  size?: sizes;
  options: Array<IOption>;
  id?: string;
  label?: string;
  value?: string;
  required?: boolean;
  defaultOption?: boolean;
  defaultOptionName?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean
  width?: string;
  height?: string;
  menuMaxHeight?: string;
  menuHeight?: string;
  containerStyle?: CSSProperties;
  error?: boolean;
  errorMessage?: string;
  dynamicData?: boolean;
  disabledOptions?: Array<string>
  classNames?: classNames;
}
