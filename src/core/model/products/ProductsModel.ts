import AxiosContext from "@context/axios/AxiosContext";
import { useStorage } from "@context/global-state/GlobalState";
import { IAxiosResponse } from "@interfaces/context/axios/Axios";
import { IProduct, IProductsModel, IProductsStorage } from "@interfaces/model/products/Products";
import { useCallback, useContext, useEffect } from "react";
import { ERROR_COUNTER } from "../../../data/constant/constant";

const useProductsModel = (): IProductsModel => {
  const axios = useContext(AxiosContext)

  const initialState: IProductsStorage = {
    state: false,
    products: [],
    errorCounter: 0,
    
  }

  const { storage, updateStorage } = useStorage<IProductsStorage>('products', initialState)

  const readProducts = useCallback(
    async () => {
      await axios.get<IAxiosResponse<Array<IProduct>>>(`https://api.mercadolibre.com/sites/MLM/search?q=ipod nano&limit=5`)
        .then(({ data: { results } }) => {
          console.log('products', results)

          updateStorage({ ...storage, products: results, state: true })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANNOT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
        })
    },
    [axios, storage, updateStorage]
  )

  const getProductsByCategory = useCallback(
    async (categoryId: string) => {
      await axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=${categoryId}`)
        .then(({data: { results }}) => {
          console.log('items', results)

          updateStorage({products: results, state: true, errorCounter: storage.errorCounter })
        })
        .catch((error) => {
          const response = error.response?.data?.message ? error.response?.data?.message : 'CANNOT CONNECT TO SERVER'
          updateStorage({ ...storage, errorCounter: ++storage.errorCounter })
        })
    },
    [axios, storage, updateStorage]
  )

  useEffect(() => {
    if (!storage.state && storage.errorCounter < ERROR_COUNTER) readProducts()
    
  }, [storage.errorCounter, storage.state])

  return {
    productStorage: storage,
    readProducts,
    getProductsByCategory
  }
}

export default useProductsModel;