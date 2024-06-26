import { ColumnFilter } from '@tanstack/react-table'
import { generateId } from '@components/global/modal/tools/generateId'
import { ITableFilter, IFilterApplied, IFilter } from '@interfaces/shared/components/table-filter/TableFilter'
import Chip from '../chip/Chip'
import CustomSelect from '../custom-select/Select'
import InputLabel from '../input-label/InputLabel'
import React, { useMemo, useRef, useState } from 'react'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { IOption } from '@interfaces/global/Option'

export default function TableFilter<T> ({ columnFilters, setColumnFilters, availableFilters }: ITableFilter<T>) {
  const [filterDisabledOption, setfilterDisabledOption] = useState<Array<string>>([])
  const inputFilterRef = useRef<string>('')

  const filterOptions = useMemo<Array<IOption>>(
    () => {
      return availableFilters.map((filter) => {
        return {
          id: filter.column as string,
          name: filter.name
        }
      })
    }, [availableFilters]
  )

  const appliedFilters = useMemo<Array<IFilterApplied<T>>>(
    () => {
      return columnFilters.map((filter) => {
        const name = availableFilters.find(available => available.column === filter.id) as IFilter<T>
        return {
          column: filter.id,
          value: filter.value as string,
          name: name?.name ?? filter.id
        }
      })
    }, [availableFilters, columnFilters]
  )

  const applyFilter = (column: string, value:string) => {
    if (!filterDisabledOption.includes(column)) {
      setfilterDisabledOption([...filterDisabledOption, column])
    }
    if (column === '') return
    const filters = new Map<string, ColumnFilter>()
    columnFilters.forEach((filter) => {
      filters.set(filter.id, { ...filter })
    })
    filters.set(column, { id: column, value })
    setColumnFilters(Array.from(filters.values()))
  }

  const deleteFilter = (column: string) => {
    setfilterDisabledOption(filterDisabledOption.filter(item => item !== column))
    if (column === '') return
    const filters = new Map<string, ColumnFilter>()
    columnFilters.forEach((filter) => {
      filters.set(filter.id, { ...filter })
    })
    filters.delete(column)
    setColumnFilters(Array.from(filters.values()))
  }

  return (
    <div className='flex justify-end w-[100%] h-[50px] 2xl:h-[70px] gap-2'>
      <div className='flex justify-center items-center w-[30%]'>
        <InputLabel
          radius='none'
          type="text"
          name="filterInput"
          variant='faded'
          onChange={(e) => { inputFilterRef.current = e.target.value }}
          classNames={{
            inputWrapper: 'bg-white min-w-[300px] rounded-[8px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
          }}
          endContent={

            <CustomSelect
              radius='none'
              size='sm'
              variant='faded'
              labelPlacement='outside-left'
              options={filterOptions}
              disabledOptions={filterDisabledOption}
              placeholder='Select filter'
              startContent={<BsFillFilterSquareFill size={26} className='text-white' />}
              onChange={(e) => applyFilter(e.target.value, inputFilterRef.current)}
              classNames={{
                trigger: 'bg-primary border-none rounded-[8px] w-auto !text-white',
                base: '!text-white',
                innerWrapper: '!text-white',
                mainWrapper: '!text-white',
                helperWrapper: '!text-white',
                value: '!text-white pl-2'
              }}
            />
          }
        />

      </div>
      <div className='flex flex-wrap items-center w-[70%] overflow-y-auto gap-2'>
        {
          appliedFilters.map((filter) => (

            <Chip
              key={generateId()}
              size='lg'
              variant="shadow"
              onClose={() => deleteFilter(filter.column as string)}
              classNames={{
                base: 'bg-[#091638] tracking-wide text-white h-[30px]'
              }}
            >
              <p className='font-semibold text-[16px] 2xl:text-[18px]'>{filter.name}: <span className='text-[14px] 2xl:text-[16px] italic overflow-hidden text-ellipsis whitespace-nowrap'>{filter.value}</span> </p>
            </Chip>
          ))
        }
      </div>

    </div>
  )
}
