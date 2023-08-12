import { Type } from "../entities/type";
import {
  addNewType,
  deleteTypeData,
  getTypesData,
} from "../repository/typeRepo";

export const getTypes = () => {
  const types = getTypesData();
  return types;
};

export const addType = (
  description: string,
  file: string,
  id: number,
  name: string
) => {
  addNewType(description, file, id, name);
};

export const deleteType = (typeId: number, typeFile: string) => {
  deleteTypeData(typeId, typeFile);
};
