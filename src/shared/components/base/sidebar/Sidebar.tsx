import AxiosContext from "@context/axios/AxiosContext";
import {
  ICategories,
  ICategoriesStorage,
  ISidebarItem,
} from "@interfaces/shared/components/sidebar/Sidebar.interface";
import useProductsModel from "@model/products/ProductsModel";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const initialState: ICategoriesStorage = {
    categories: [],
    subCategories: {},
    state: false,
  };

  const axios = useContext(AxiosContext);
  const [storage, setStorage] = useState<ICategoriesStorage>(initialState);
  const { getProductsByCategory } = useProductsModel()
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const getCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://api.mercadolibre.com/sites/MLA/categories"
      );
      console.log("categories", data);
      setStorage((prevState) => ({
        ...prevState,
        categories: data,
        state: true,
      }));
    } catch (error) {
      console.log("error", error);
    }
  }, [axios]);

  const getSubcategories = useCallback(
    async (categoryId: string) => {
      try {
        const { data } = await axios.get(
          `https://api.mercadolibre.com/categories/${categoryId}`
        );
        console.log("sub categories", data.children_categories);

        if (data.children_categories.length >= 1) {
          setStorage((prevState) => ({
            ...prevState,
            subCategories: {
              ...prevState.subCategories,
              [categoryId]: data.children_categories,
            },
          }));
        } else {
          getProductsByCategory(categoryId)
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [axios]
  );

  const SidebarItem = ({ item }: ISidebarItem) => {
    const handleClick = async () => {
      if (!openCategories[item.id]) {
        await getSubcategories(item.id);
      }
      setOpenCategories((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    };

    const isOpen = openCategories[item.id];
    const subCategories: Array<ICategories> =
      storage.subCategories[item.id] || [];

    return (
      <li>
        <a
          href="#"
          className="block text-white p-2 hover:bg-gray-600 bg-slate-500]"
          onClick={handleClick}
        >
          <span className="flex gap-4">
            {!isOpen ? (
              <FaPlus className="w-5 h-5" />
            ) : (
              <FaMinus className="w-5 h-5" />
            )}
            {item.name}
          </span>
        </a>
        {isOpen && subCategories.length > 0 && (
          <ul className="bg-gray-700 pl-4">
            {subCategories.map((subItem) => (
              <SidebarItem key={subItem.id} item={subItem} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  useEffect(() => {
    if (!storage.state) getCategories();
  }, [storage.state, getCategories]);

  return (
    <div className="h-full w-full flex flex-col items-center overflow-scroll p-2">
      <ul className="w-[90%]">
        {storage.categories.map((category) => (
          <SidebarItem key={category.id} item={category} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
