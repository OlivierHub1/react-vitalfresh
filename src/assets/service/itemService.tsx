import { Item } from "../entities/item";
import {
  addNewItem,
  deleteItemData,
  editNewItem,
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

export const editItem = (
  description: string,
  file: string,
  oldFile: string,
  id: number,
  name: string,
  price: number,
  type: number
) => {
  editNewItem(description, file, oldFile, id, name, price, type);
};

export const deleteItem = (itemId: number, itemFile: string, type:number) => {
  deleteItemData(itemId, itemFile, type);
};

export const getItemsByType = (itemType: number) => {
  const types = getTypesData();
  const matchingType = types.find((type) => type.id === itemType);
  if (matchingType) {
    return matchingType.name;
  }
  return "";
};
