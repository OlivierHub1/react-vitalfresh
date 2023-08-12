import React, { useState, useEffect } from "react";
import { ref, onValue, remove, child, set } from "firebase/database";
import { db, storage } from "../firebase";
import { User } from "../entities/user";
import { Item } from "../entities/item";
import { deleteObject, ref as storageRef } from "@firebase/storage";

export const getItemsData = () => {
  const [todoData, setTodoData] = useState<Item[]>([]);

  useEffect(() => {
    const startCountRef = ref(db, "item/");
    const unsubscribe = onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      //console.log(newPosts);
      setTodoData(newPosts);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return todoData;
};

export const addNewItem = (
  description: string,
  file: string,
  id: number,
  name: string,
  price: number,
  type: number
) => {
  const itemRef = ref(db, "item/");

  const newItem = {
    description: description,
    file: file,
    id: id,
    name: name,
    price: price,
    type: type,
  };

  set(child(itemRef, String(id)), newItem);
};

export const deleteItemData = (itemId: number, itemFile: string, type:number) => {
  //Delete item
  const typeRef = ref(db, "item/" + itemId);

  //Delete file
  const startIndex = itemFile.lastIndexOf(convertTypeId(type) + "%2F") + (3 + convertTypeId(type).length);
    const endIndex = itemFile.indexOf("?");
    console.log(itemFile.substring(startIndex, endIndex))
    const itemRefStorage = storageRef(
      storage,
      "product/" + convertTypeId(type) + "/" + itemFile.substring(startIndex, endIndex)
    );

  remove(typeRef).then(() => {
    console.log("Item " + itemId + " remove");
  });
  deleteObject(itemRefStorage).then(() => {
    console.log("Item image remove: " + itemFile.substring(startIndex, endIndex));
  });
};

export const editNewItem = (
  description: string,
  file: string,
  oldFile: string,
  id: number,
  name: string,
  price: number,
  type: number
) => {
  const itemRef = ref(db, "item/" + id);

  set(itemRef, {
    description: description,
    file: file,
    id: id,
    name: name,
    price: price,
    type: type,
  });

  //Delete file
  if (file != oldFile) {
    const startIndex = oldFile.lastIndexOf(convertTypeId(type) + "%2F") + (3 + convertTypeId(type).length);
    const endIndex = oldFile.indexOf("?");
    console.log(oldFile.substring(startIndex, endIndex))
    const itemRefStorage = storageRef(
      storage,
      "product/" + convertTypeId(type) + "/" + oldFile.substring(startIndex, endIndex)
    );

    deleteObject(itemRefStorage).then(() => {
      console.log("Item image remove: " + oldFile.substring(startIndex, endIndex));
    });
  }
};

function convertTypeId(typeId: number) {
  let typeName = "";

  switch (Number(typeId)) {
    case 0:
      return (typeName = "fruits");
    case 1:
      return (typeName = "meats");
    case 2:
      return (typeName = "dairy");
    case 3:
      return (typeName = "vegetables");
    case 4:
      return (typeName = "grain");
  }
}
