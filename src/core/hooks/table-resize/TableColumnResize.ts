import { useState, useEffect } from 'react'

const useTableColumnResize = (columns: number, rowSelection?: boolean) => {
  const [columnWidth, setColumnWidth] = useState<number>(100)

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById('table')

      if (element) {
        let divWidth = element.clientWidth - 20
        let numColumns = columns
        if (rowSelection) {
          divWidth = divWidth - 30
          numColumns = numColumns - 1
        }
        const width = element.clientWidth > 800 ? divWidth / numColumns : 100
        setColumnWidth(width)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [columns, rowSelection])

  return columnWidth
}

export default useTableColumnResize
