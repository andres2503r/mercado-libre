import { useMemo } from 'react'
import { NextPage } from 'next'
import usePermissionsModel from '@model/permissions/PermissionsModel'
import Table from '@components/global/table/Table'
import { CellContext, createColumnHelper } from '@tanstack/react-table'
import { IFilter } from '@interfaces/shared/components/table-filter/TableFilter'
import { IPermission } from '@interfaces/model/permissions/Permission'
import Restricted from '@components/global/restricted/Restricted'
import Grid from '@components/global/grid/grid'
import Chip from '@components/global/chip/Chip'
import Spinner from '@components/global/spinner/Spinner'
import useSpinnerModel from '@model/spinner/SpinnerModel'

const SettingsPermissions: NextPage = () => {
  const { spinnerStorage } = useSpinnerModel()
  const { permissionsStorage } = usePermissionsModel()

  const columnHelper = createColumnHelper<IPermission>()

  const permissionList = useMemo<Array<IPermission>>(() => Array.from(permissionsStorage.list.values()), [permissionsStorage.list])

  const avaliableFilters = useMemo<Array<IFilter<IPermission>>>(() => [
    {
      name: 'name',
      column: 'permissionName'
    },
    {
      name: 'Description',
      column: 'permissionDescription'
    }
  ], [])

  const columns = [
    columnHelper.accessor('permissionName', {
      header: () => <span>Name</span>
    }),
    columnHelper.accessor('permissionDescription', {
      header: () => <span>Description</span>
    }),
    columnHelper.display({
      id: 'state',
      header: () => <span> State </span>,
      cell: ({ row: { original } }: CellContext<IPermission, unknown>) => (
        <div className='flex items-center justify-center gap-2'>
          <Chip
            text={original.permissionState ? 'Active' : 'Inactive'}
            size='md'
            variant='shadow'
            radius='full'
            classNames={{
              base: `${original.permissionState ? 'bg-green-400 shadow-green-400' : 'bg-orange-400 shadow-orange-400'} shadow-md  2xl:h-[50px] h-[30px] w-[140px]`,
              content: 'font-medium w-[80px] text-center text-textColor'
            }}
          />
        </div>
      )
    })
  ]

  return (
    <>
      <Spinner open={spinnerStorage}/>
      <Restricted permission='settings:permission:read'>
        <Grid
          title='Permission'

        >
          <Table<IPermission>
            columns={columns}
            data={permissionList}
            availableFilters={avaliableFilters}
            enableTablePagination
          />
        </Grid>
      </Restricted>
    </>
  )
}

export default SettingsPermissions
