import { Item } from "../entities/item";
import {
  addNewItem,
  deleteItemData,
  getItemsData,
} from "../repository/itemRepo";
import { getTypesData } from "../repository/typeRepo";

export const getItems = () => {
  const items = getItemsData();
  return items;
};

export const addItem = (
  description: string,
  file: string,
  id: number,
  name: string,
  price: number,
  type: number
) => {
  addNewItem(description, file, id, name, price, type);
};

export const deleteItem = (itemId: number, itemFile: string) => {
  deleteItemData(itemId, itemFile);
};

export const getItemsByType = (itemType: number) => {
  const types = getTypesData();
  const matchingType = types.find((type) => type.id === itemType);
  if (matchingType) {
    return matchingType.name;
  }
  return "";
};
