import { IDialog } from '@interfaces/shared/components/dialog/Dialog'
import { useState, useCallback } from 'react'

interface Dialog extends Pick<IDialog, 'titlePrimaryButton' | 'titleSecondaryButton'>{
  open: boolean;
  title: string;
  content: string;
  showSecondaryButton: boolean;
  primaryOnClick: () => void
}

interface IUseDilogHook {
  dialog: Dialog;
  openDialog: (newTitle: string, newContent: string, newSecondaryButton: boolean, primaryOnClick: () => void, textPrimary?: string, textSecondary?: string) => void;
  closeDialog: () => void;
}

const useDialog = (): IUseDilogHook => {
  const dataDialog: Dialog = {
    open: false,
    title: '',
    content: '',
    showSecondaryButton: false,
    primaryOnClick: () => console.log('close'),
    titlePrimaryButton: undefined,
    titleSecondaryButton: undefined
  }

  const [dialog, setDialog] = useState<Dialog>(dataDialog)

  const openDialog = useCallback((newTitle: string, newContent: string, newSecondaryButton: boolean, primaryOnClick: () => void, textPrimary?: string, textSecondary?: string) => {
    setDialog({
      open: true,
      title: newTitle,
      content: newContent,
      showSecondaryButton: newSecondaryButton,
      primaryOnClick,
      titlePrimaryButton: textPrimary,
      titleSecondaryButton: textSecondary
    })
  }, [])

  const closeDialog = useCallback(() => {
    setDialog({
      ...dialog,
      ...dataDialog,
      open: false
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog])

  return { dialog, openDialog, closeDialog }
}

export default useDialog
