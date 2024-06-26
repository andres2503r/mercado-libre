export interface IOption {
  id: string;
  name: string;
}

export interface IOptionMultiSelect extends IOption {
  checked: boolean
}
