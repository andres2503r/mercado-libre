import { useStorage } from '@context/global-state/GlobalState'
import { useCallback, useContext, useEffect } from 'react'
import { ERROR_COUNTER } from '../../../data/constant/constant'
import AxiosContext from '@context/axios/AxiosContext'
import { IAxiosResponse } from '@interfaces/context/axios/Axios'
import showToast from '@components/global/toast/Toast'
import { IPermission, IPermissionModel, IPermissionStorage } from '@interfaces/model/permissions/Permission'
import useSpinnerModel from '@model/spinner/SpinnerModel'

const usePermissionsModel = (): IPermissionModel => {
  const { setSpinner } = useSpinnerModel()
  const axios = useContext(AxiosContext)

  const initialState: IPermissionStorage = {
    state: false,
    errorCounter: 0,
    list: new Map()
  }
  const { storage, updateStorage } = useStorage<IPermissionStorage>('permissions', initialState)

  const readPermissions = useCallback(
    async () => {
      setSpinner(true)
      await axios.get<IAxiosResponse<Array<IPermission>>>(`/permissions`)
        .then(({ data: { result } }) => {
          const list = new Map<string, IPermission>()
          result.forEach((permission) => {
            list.set(permission.permissionId, permission)
          })
          updateStorage({ ...storage, list, state: true })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANNOT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 1000)
        })
    },
    [axios, storage, updateStorage, setSpinner]
  )

  useEffect(() => {
    if (!storage.state && storage.errorCounter < ERROR_COUNTER) readPermissions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage.errorCounter, storage.state])

  return {
    permissionsStorage: storage,
    readPermissions
  }
}

export default usePermissionsModel
