export interface ICategories {
  id: string,
  name: string;
}

export interface ICategoriesStorage {
  categories: Array<ICategories>;
  subCategories: any;
  state: boolean;
}

export interface ISidebarItem {
  item: ICategories;
  // isLast: boolean;
}