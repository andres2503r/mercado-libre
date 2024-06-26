export interface IDialog {
  title: string;
  content: string;
  showSecondaryButton?: boolean;
  titlePrimaryButton?: string
  titleSecondaryButton?: string
  open: boolean;
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
  setDialog?: () => void;
  closeDialog:() => void;
}
export interface IDialogData{
  bulk?: boolean;
  open: boolean;
  data: number | number[] | null;
}
