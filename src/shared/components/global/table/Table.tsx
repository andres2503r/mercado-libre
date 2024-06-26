import React, { useRef, useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react'
import {
  ColumnFiltersState,
  Row,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationOptions
} from '@tanstack/react-table'
import useTableColumnResize from '@hooks/table-resize/TableColumnResize'
import { ITable } from '@interfaces/shared/components/table/Table'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Button } from '@nextui-org/react'

export default function Table<T> ({ enableTableFooter, tableHeight, enableTableFilter, availableFilters, TableAction, enableTablePagination, onRowSelection, scrollAction, NotDataComponent, clearState, actionClear, ...props }: ITable<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const scrollableRef = useRef<HTMLTableSectionElement>(null)
  const rowSelectionRef = useRef<Map<string, Row<T>>>(new Map())
  const rowSelectionNotify = useRef<boolean>(false)
  const [pagination, setPagination] = useState<Record<'pageIndex'|'pageSize', number>>({
    pageIndex: 0,
    pageSize: 10
  })
  const [currentPage, setCurrentPage] = useState(1)

  const columnWidth = useTableColumnResize(props.columns.length, !!props.enableRowSelection)
  const onRowSelectionHandler = (row: Row<T>):boolean => {
    if (rowSelectionRef.current.get(row.id)) {
      if (!row.getIsSelected()) {
        rowSelectionNotify.current = true
        rowSelectionRef.current.delete(row.id)
      }
    } else if (row.getIsSelected()) {
      rowSelectionNotify.current = true
      rowSelectionRef.current.set(row.id, row)
    }

    if (rowSelectionNotify.current) {
      rowSelectionNotify.current = false
      if (onRowSelection) {
        const selected = table.getSelectedRowModel().flatRows.map(row => row.original)
        onRowSelection(selected)
      }
    }

    return true
  }

  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
    columns: props.columns.map((column) => {
      return {
        ...column,
        size: column.id === 'rowSelection' ? 30 : columnWidth
      }
    }),
    defaultColumn: {
      filterFn: 'includesString'
    },
    state: {
      columnFilters,
      rowSelection,
      pagination
      
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: props.enableRowSelection ? onRowSelectionHandler : false,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    
  })

  const scrollHandler = useCallback((event?: HTMLTableSectionElement | null) => {
    if (!event) return
    const { scrollHeight, scrollTop, clientHeight } = event

    const clientCurrentScrollTop = scrollHeight - clientHeight - scrollTop
    if (clientCurrentScrollTop < 5 && scrollAction) {
      scrollAction()
    }
  }, [scrollAction]
  )
  const arrayTheActualCellsRenderInTable: Array<string> = []
  const renderRows = table.getRowModel().rows
  renderRows.forEach((row) => {
    const cells = row.getVisibleCells()
    cells.forEach((cell) => arrayTheActualCellsRenderInTable.push(cell.row.id))
  })
  const handleChangePagination = (num: number) => {
    setPagination({ ...pagination, pageIndex: table.getState().pagination.pageIndex = num - 1 })
    setCurrentPage(num)
  }

  useEffect(() => {
    if (clearState && actionClear) {
      setRowSelection({})
      actionClear(!clearState)
      scrollHandler(scrollableRef.current)
    }
  }, [actionClear, clearState, scrollHandler])

  const findRowForId = (id: string) => {
    const allRows = table.getRowModel().flatRows
    return allRows.find((row) => row.id === id)
  }

  const goToPageContainingElement = (id:string) => {
    const findRow = findRowForId(arrayTheActualCellsRenderInTable[0])
    if (findRow) {
      const indexCurrentPage = Math.floor(findRow?.index / table.getState().pagination.pageSize)
      setPagination({ ...pagination, pageIndex: table.getState().pagination.pageIndex = indexCurrentPage })
      setCurrentPage(indexCurrentPage + 1)
    }
  }
  const handleSelectViewElements = (e:ChangeEvent<HTMLSelectElement>) => {
    setPagination({ ...pagination, pageSize: table.getState().pagination.pageSize = parseInt(e.target.value) })
    if (findRowForId(arrayTheActualCellsRenderInTable[0])) {
      goToPageContainingElement(arrayTheActualCellsRenderInTable[0])
    } else {
      setPagination({ ...pagination, pageIndex: table.getState().pagination.pageIndex = 0 })
      setCurrentPage(table.getState().pagination.pageIndex + 1)
    }
  }

  const filterStatus = useMemo<boolean>(() => {
    if (enableTableFilter !== undefined && enableTableFilter === false) return false
    return true
  }, [enableTableFilter])

  const customStyles = {
    root: {
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    } as React.CSSProperties,
  }

  // const startRow = table.getState().pagination.pageIndex * table.getRowCount();
  const { pageIndex, pageSize } = table.getState().pagination
  const { data } = table.options
  const startRow = pageIndex * pageSize + 1;
  const endRow = startRow + Math.min((pageIndex + 1) * data.length) - 1;
  const totalRows = data.length;

  return (
    <div
      id='table'
      className={`max-h-[90vh] 2xl:max-h-[92vh] bg-zinc-500 flex flex-col justify-around`}
      style={customStyles.root}
    >
      {/* {filterStatus && (
        <div className="container_header_action w-[100%] h-[40px] 2xl:h-[69px] min-[3000px]:h-[80px] flex">
          <TableFilter<T>
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            availableFilters={availableFilters ?? []}
          />
          {TableAction && <TableAction />}
        </div>
      )} */}
      <div className='w-[70vw] h-[80vh] 2xl:w-[72vw] sm:w-[81vw] rounded-lg shadow-md overflow-y-auto border-solid border-white border-2'>
        <table className="table flex-col">
          <thead className="sticky z-20   shadow-xl top-0 w-full">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`ps-5 h-[30px] 2xl:h-[53px] relative text-[12px]  first:rounded-tl-[8px]  2xl:text-[16px]  border-solid border-white border-b-2 text-white ${
                      (header.column.id === 'state' || header.column.id === 'options' || header.column.id === 'file.fileState')
                        ? 'text-center'
                        : ''
                    }`}
                    style={{
                      width: header.getSize(),
                      maxWidth: header.getSize()
                    }}
                  >
                    <div
                      className={`flex items-center justify-center rounded-lg overflow-hidden text-ellipsis whitespace-nowrap${
                        (header.column.id === 'state' || header.column.id === 'options' || header.column.id === 'file.fileState')
                          ? 'flex justify-center text-center '
                          : ''
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            id="scrollable-table"
            ref={scrollableRef}
            onScroll={(e) => scrollHandler(e.target as HTMLTableSectionElement)}
          >

            {props.data.length === 0 && NotDataComponent
              ? (
                <tr className='tr_not_data'>
                  <td className='h-full w-full' colSpan={props.columns.length}>
                    <NotDataComponent />
                  </td>
                </tr>
              )
              : table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`ps-4 h-[70px] 2xl:h-[143px] text-[15px] text-white 2xl:text-[15px] border-solid border-b-2 border-white`}
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        textAlign: cell.id.match(/rowSelection/g) ? 'center' : 'left'
                      }}
                      
                    >
                      <div className="flex-wrap p-1 overflow-hidden flex justify-center overflow-ellipsis">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>

          {enableTablePagination && props.data.length > 0 && (
            <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id} className="p-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
      {enableTablePagination && props.data.length > 0 &&
      <div className="flex justify-start px-4  w-[100%] h-[30px] 2xl:h-[40px]  items-center">
        <div className='flex gap-4  items-center'>
          <span >{startRow} - { endRow } de { totalRows }</span>
          <Button isIconOnly variant='ghost' aria-label="previous page" className='hover:text-black hover:text-3xl'>
            <IoIosArrowBack className='' />
          </Button>    
          <Button isIconOnly variant="ghost" aria-label="next page" className='hover:text-black hover:text-3xl'>
            <IoIosArrowForward />
          </Button>
          
          {/* <h1 className=' text-black text-[20px]  2xl:text-[20px]'>{table.getState().pagination.pageIndex + 1} out of{' '} {table.getPageCount()}</h1>
          <Pagination
            isCompact
            showShadow
            disableCursorAnimation
            showControls
            aria-label='pagination'
            total={table.getPageCount()}
            page={currentPage}
            classNames={{ cursor: 'bg-red-500', wrapper: 'border' }}
            onChange={handleChangePagination}
          />
          <Select
            disallowEmptySelection
            size='sm'
            aria-label='select page'
            className="w-48"
            selectedKeys={[pagination.pageSize.toString()]}
            classNames={{
              trigger: 'bg-white'
            }}
            onChange={handleSelectViewElements}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={pageSize} className=' text-black'>
                {`Show ${pageSize}`}
              </SelectItem>
            ))}
          </Select> */}
        </div>
      </div>
      }
    </div>
  )
}
