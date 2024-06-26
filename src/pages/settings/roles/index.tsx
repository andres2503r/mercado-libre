import { useCallback, useMemo } from 'react'
import { NextPage } from 'next'
import Table from '@components/global/table/Table'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { IFilter } from '@interfaces/shared/components/table-filter/TableFilter'
import Modal from '@components/global/modal/Modal'
import { useModalHandler } from '@components/global/modal/hooks/modalHandler'
import { IOption } from '@interfaces/global/Option'
import usePermissionsModel from '@model/permissions/PermissionsModel'
import roleModal, { IModalRoleResult, IUpdateRoleState } from '@components/global/modal/config/roles.config'
import useRolesModel from '@model/roles/RolesModel'
import TableAction from '@components/global/table-action/TableAction'
import Switch from '@components/global/switch/Switch'
import { IRole } from '@interfaces/model/roles/Roles'
import { IPermission } from '@interfaces/model/permissions/Permission'
import useDialog from '@hooks/dialog/dialogHook'
import Dialog from '@components/global/dialog/Dialog'
import Grid from '@components/global/grid/grid'
import Button from '@components/global/button/Button'
import useSpinnerModel from '@model/spinner/SpinnerModel'
import Spinner from '@components/global/spinner/Spinner'
import { IButtonConfig } from '@interfaces/shared/components/table-action/TableAction'
import NotDataComponent from '@components/global/not-data-component/NotDataComponent'
import CreateIcon from '@public/table/create'
import EditIcon from '@public/table/edit'
import DeleteIcon from '@public/table/delete'

const SettingsRoles: NextPage = () => {
  const { spinnerStorage } = useSpinnerModel()
  const { rolesStorage, createRole, updateRole, updateRoleState, deleteRole } = useRolesModel()
  const { permissionsStorage } = usePermissionsModel()
  const { openDialog, dialog, closeDialog } = useDialog()
  const { open, openModal, config, close } = useModalHandler()

  const columnHelper = createColumnHelper<IRole>()

  const roleList = useMemo<Array<IRole>>(() => {
    const data: Array<IRole> = Array.from(rolesStorage.roles.values())
    return data
  }, [rolesStorage.roles])

  const selectOptions = useCallback(() => {
    const permissionsList: Array<IPermission> = Array.from(permissionsStorage.list.values())

    const options: Array<IOption> = permissionsList.map((permission) => {
      return {
        id: permission.permissionId,
        name: permission.permissionDescription
      }
    })
    return options
  }, [permissionsStorage.list])

  const onCreateHandler = useCallback((data: IModalRoleResult) => {
    const permissionsSelected: Array<string> = [...data.permissions]
    const permissions = permissionsSelected.map((id: string) => {
      return {
        permissionId: id
      }
    })

    createRole({ ...data, permissions })
  }, [createRole])

  const updateHandler = useCallback((data: IModalRoleResult) => {
    const permissionsSelected: Array<string> = [...data.permissions]
    const permissions = permissionsSelected.map((id: string) => {
      return {
        permissionId: id
      }
    })

    updateRole(data.roleId as string, {
      ...data,
      permissions
    })
  }, [updateRole])

  const updateState = useCallback(({ roleId, roleState }: IUpdateRoleState) => {
    const newState: boolean = roleState === false
    updateRoleState(roleId, newState)
  }, [updateRoleState])

  const onUpdate = useCallback((role: IRole) => {
    const data = { ...role, permissionList: selectOptions() }
    openModal(roleModal.default({ ...data }, updateHandler))
  }, [openModal, selectOptions, updateHandler])

  const avaliableFilters = useMemo<Array<IFilter<IRole>>>(() => [
    {
      name: 'Name',
      column: 'roleName'
    },
    {
      name: 'Description',
      column: 'roleDescription'
    }
  ], [])

  const buttons: Array<IButtonConfig> = [

    {
      icon: <CreateIcon/>,
      onClick: () => {
        const permissionList: Array<IOption> = selectOptions()
        openModal(roleModal.default({ permissionList }, onCreateHandler))
      },
      className: 'bg-[#5AC8FB] hover:bg-[#28BBFF]'
    }
  ]

  const TableHeaderAction = () => (
    <Restricted permission='settings:roles:create'>
      <TableAction buttons={buttons}/>
    </Restricted>
  )

  const columns = [
    columnHelper.accessor('roleName', {
      header: () => <span>Name</span>
    }),
    columnHelper.accessor('roleDescription', {
      header: () => <span>Description</span>
    }),
    columnHelper.display({
      id: 'state',
      header: () => <span>State</span>,
      cell: ({ row: { original: { roleId, roleName, roleState } } }: CellContext<IRole, unknown>) => (
        <Restricted permission='settings:roles:update'>
          <div className='flex items-center justify-center gap-2'>
            <Switch
              name={`switch-${roleName}`}
              state={roleState}
              tooltip={roleState ? 'Deactivate' : 'Activate'}
              onClick={() => openModal(roleModal.state({ roleId, roleState }, updateState))}
            />
          </div>
        </Restricted>
      )
    }),
    columnHelper.display({
      id: 'options',
      header: () => <span>Options</span>,
      cell: ({ row: { original } }: CellContext<IRole, unknown>) => (
        <div className='flex items-center justify-center gap-2'>
          <Restricted permission='settings:roles:update'>
            <Button
              isIconOnly
              className='bg-[#F7F7F7]'
              variant='light'
              aria-label={`view-${original.roleId}`}
              onClick={() => onUpdate(original)}
              tooltip='edit'
            >
              <EditIcon/>
            </Button>
          </Restricted>
          <Restricted permission='settings:roles:delete'>
            <Button
              isIconOnly
              variant='light'
              tooltip='delete'
              aria-label={`delete-${original.roleId}`}
              onClick={() => openDialog(
                'Delete Rol',
                `¿Are you sure you want  to delete the role "${original.roleName}"?`,
                true,
                () => deleteRole(original.roleId)
              )}
            >
              <DeleteIcon/>
            </Button>
          </Restricted>
        </div>
      )
    })
  ]

  return (
    <>
      <Spinner open={spinnerStorage} />
      <Restricted permission='settings:roles:read'>
        <Grid
          title='Roles'
        >
          <Table<IRole>
            columns={columns}
            data={roleList}
            TableAction={TableHeaderAction}
            availableFilters={avaliableFilters}
            enableTablePagination
            NotDataComponent={() => <NotDataComponent message='No roles found' imageSrc='/table/no-data-user.svg' /> }
          />
        </Grid>

        <Modal
          open={open}
          close={close}
          config={config}
        />
        <Dialog {...dialog} closeDialog={closeDialog} />
      </Restricted>
    </>
  )
}

export default SettingsRoles
