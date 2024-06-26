import { useCallback, useContext, useEffect } from 'react'
import AxiosContext from '@context/axios/AxiosContext'
import { useStorage } from '@context/global-state/GlobalState'
import { ERROR_COUNTER } from '../../../data/constant/constant'
import { ICreateRole, IRole, IRoleModel, IRoleStorage, ISocketRole, IUpdateRole } from '@interfaces/model/roles/Roles'
import { IAxiosResponse } from '@interfaces/context/axios/Axios'
import showToast from '@components/global/toast/Toast'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import { Socket } from 'socket.io-client'

const useRolesModel = (): IRoleModel => {
  const { setSpinner } = useSpinnerModel()
  const axios = useContext(AxiosContext)

  const initialState: IRoleStorage = {
    state: false,
    roles: new Map(),
    errorCounter: 0
  }

  const { storage, updateStorage } = useStorage<IRoleStorage>('roles', initialState)

  const createRole = useCallback(
    async (role: ICreateRole) => {
      setSpinner(true)
      await axios.post<IAxiosResponse<IRole>>(`/roles`, role)
        .then(({ data: { result } }) => {
          const roles = new Map<string, IRole>(storage.roles.entries())
          roles.set(result.roleId, result)
          showToast('success', 'The role has been created successfully')
          updateStorage({ ...storage, roles, state: true })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANNOT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
          showToast('error', response)
        })
        .finally(() => {
          setTimeout(() => setSpinner(false), 1000)
        })
    }, [axios, storage, updateStorage, setSpinner]
  )

  const readRoles = useCallback(
    async () => {
      setSpinner(true)
      await axios.get<IAxiosResponse<Array<IRole>>>(`/roles`)
        .then(({ data: { result } }) => {
          const roles = new Map<string, IRole>()
          result.forEach((role) => {
            roles.set(role.roleId, role)
          })

          updateStorage({ ...storage, roles, state: true })
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

  const updateRole = useCallback(
    async (roleId: string, updateData: IUpdateRole) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IRole>>(`/roles/${roleId}`, updateData)
        .then(({ data: { result } }) => {
          const roles: Map<string, IRole> = new Map<string, IRole>(storage.roles.entries())
          roles.set(result.roleId, result)
          showToast('success', 'The role has been updated successfully!')
          updateStorage({ ...storage, roles })
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

  const updateRoleState = useCallback(
    async (roleId: string, roleState: boolean) => {
      setSpinner(true)
      await axios.put<IAxiosResponse<IRole>>(`/roles/${roleId}/state`, { roleState })
        .then(({ data: { result } }) => {
          const roles = new Map<string, IRole>(storage.roles.entries())
          roles.set(result.roleId, result)

          updateStorage({ ...storage, roles })

          showToast('success', 'The role state has been updated successfully!')
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

  const deleteRole = useCallback(
    async (roleId: string) => {
      setSpinner(true)
      await axios.delete<IAxiosResponse<string>>(`/roles/${roleId}`)
        .then(({ data: { result } }) => {
          const roles: Map<string, IRole> = new Map<string, IRole>(storage.roles.entries())
          roles.delete(result)
          showToast('success', 'The role has been deleted successfully')
          updateStorage({ ...storage, roles })
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

  const handleRoleSocketEvents = ({ isDelete, ...role }: ISocketRole) => {
    showToast('info', 'There has been a new change on the roles')
    const roles: Map<string, IRole> = new Map<string, IRole>(storage.roles.entries())

    if (isDelete) {
      roles.delete(role.roleId)
    } else {
      roles.set(role.roleId, role)
    }
    updateStorage({ ...storage, roles })
  }

  useEffect(() => {
    if (!storage.state && storage.errorCounter < ERROR_COUNTER) readRoles()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleRoleSocketEvents, storage.errorCounter, storage.state])

  return {
    rolesStorage: storage,
    createRole,
    readRoles,
    updateRole,
    updateRoleState,
    deleteRole

  }
}

export default useRolesModel
