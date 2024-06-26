import Grid from '@components/global/grid/grid'
import Table from '@components/global/table/Table'
import { IProduct } from '@interfaces/model/products/Products'
import useProductsModel from '@model/products/ProductsModel'
import { Button, Image } from '@nextui-org/react'
import { createColumnHelper, CellContext } from '@tanstack/react-table'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FaRegEye } from 'react-icons/fa'

const HomePage: NextPage = () => {

  const columnHelper = createColumnHelper<IProduct>()
  const { productStorage, getProductsByCategory } = useProductsModel()
  const router = useRouter()

  const data = useMemo<Array<IProduct>>(() => {
    const products = new Array(...productStorage.products)
    
    console.log('copy', products)
    return products
  }, [productStorage.products, getProductsByCategory])
  
  const columns = [
    columnHelper.accessor('id', {
      header: () => <span>Product id</span>,
    }),
    columnHelper.accessor('title', {
      header: () => <span>Nombre del producto</span>
    }),
    columnHelper.accessor('price', {
      header: () => <span>Precio</span>
    }),
    columnHelper.display({
      id: 'permalink',
      header: () => <span>Mercado enlace</span>,
      cell: ({ row: { original: { permalink } } }: CellContext<IProduct, unknown>) => (
        <div className="flex gap-4 items-center">
          <Button 
            isIconOnly 
            variant='ghost'
            aria-label="more"
            size='lg'
            className='hover:text-black w-14 h-14'
            onClick={() => router.push(permalink)}
          >
            <FaRegEye/>
          </Button>
      </div>
      )

    }),
    columnHelper.display({
      id: 'thumbnail',
      header: () => <span>Imagen</span>,
      cell: ({ row: { original: { thumbnail } } }: CellContext<IProduct, unknown>) => (
        <div className='w-40 h-28 flex justify-center items-center overflow-hidden rounded-lg'>
          <Image alt='product-image' src={thumbnail}  />
        </div>
      )
    }),
  ]

  return (
    <>
      <Grid >
        <Table
        columns={columns}
        data={data}
        enableTablePagination
        />
      </Grid>
    </>
  )
}

export default HomePage
