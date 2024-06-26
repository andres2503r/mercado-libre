import { useStorage } from '@context/global-state/GlobalState'
import { ISpinnerModel } from '@interfaces/model/spinner/Spinner'

const useSpinnerModel = (): ISpinnerModel => {
  const { storage, updateStorage } = useStorage<boolean>('spinner', false)

  const setSpinner = (value: boolean) => {
    updateStorage(value)
  }

  return {
    spinnerStorage: storage,
    setSpinner
  }
}

export default useSpinnerModel
