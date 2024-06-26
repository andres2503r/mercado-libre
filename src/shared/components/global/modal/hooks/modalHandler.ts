import { useCallback, useMemo, useState } from 'react'
import { IModal, IModalConfigProps } from '../interfaces/Modal'
import showToast from '@components/global/toast/Toast'

interface IModalHandler extends IModal {
  openModal: (config: IModalConfigProps) => void;
}

export function useModalHandler (): IModalHandler {
  const initialState: IModalHandler = useMemo(
    () => {
      return {
        close: () => {},
        openModal: () => {},
        open: false,
        config: {} as IModalConfigProps

      }
    }, [])

  const [modalConfig, setModalConfig] = useState<IModalHandler>(initialState)

  const openModal = useCallback(
    (config: IModalConfigProps) => {
      if (!config) {
        showToast('warning', `This modal did not return any configuration`)
        return
      }
      setModalConfig({ ...modalConfig, config, open: true })
    }, [modalConfig]
  )

  const closeModal = useCallback(
    () => {
      setModalConfig(initialState)
    }, [initialState])

  return {
    open: modalConfig.open,
    config: modalConfig.config,
    openModal,
    close: closeModal
  }
}
