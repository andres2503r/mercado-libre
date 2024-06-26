export interface IProduct {
  id: string;
  title: string;
  permalink: string;
  category_id: string;
  thumbnail: string;
  order_backend: number;
  price: string;
}

export interface IProductsStorage {
  state: boolean;
  products: Array<IProduct>;
  errorCounter: number;
}

export interface IProductsModel {
  productStorage: IProductsStorage;
  readProducts: () => Promise<void>;
  getProductsByCategory: (categoryId: string) => Promise<void>;
}