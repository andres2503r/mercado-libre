import { DeepKeys } from '@interfaces/global/Utils'
import { ColumnFiltersState } from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'

export interface IFilter<T> {
  name: string
  column: DeepKeys<T>
}

export interface IFilterApplied<T> extends Omit<IFilter<T>, 'column'> {
  value: string
  column: string
}

export interface ITableFilter<T> {
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  availableFilters: Array<IFilter<T>>
}
