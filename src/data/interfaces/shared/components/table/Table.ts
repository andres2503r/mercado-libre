import { TableOptions } from '@tanstack/react-table'
import { IFilter } from '../table-filter/TableFilter'

export interface ITable<T> extends Omit<TableOptions<T>, 'getCoreRowModel'> {
  NotDataComponent?: () => JSX.Element;
  enableTableFooter?: boolean
  tableHeight?: number | string
  tableWidth?: number | string
  enableTableFilter?: boolean
  availableFilters?: Array<IFilter<T>>
  scrollAction?: () => void;
  onRowSelection?: (rows: Array<T>) => void
  enableTablePagination?: boolean
  clearState?: boolean;
  TableAction?: () => JSX.Element
  actionClear?: (confirmation: boolean) => void;
}
