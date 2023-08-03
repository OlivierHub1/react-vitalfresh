import React, { useState, useEffect } from "react";
import { ref, onValue, remove, child, set } from "firebase/database";
import { db, storage } from "../../firebase";
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
      console.log(newPosts);
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

export const deleteItemData = (itemId: number, itemFile: string) => {
  //Delete item
  const typeRef = ref(db, "item/" + itemId);

  //Delete file
  const startIndex = itemFile.indexOf("product%2F") + 10;
  const endIndex = itemFile.indexOf("%2F", startIndex);
  const typeName = itemFile.substring(startIndex, endIndex);
  const itemName = itemFile.substring(itemFile.lastIndexOf("/") + 1);
  console.log("Item image remove: " + typeName + "/" + itemName);
  const itemRefStorage = storageRef(
    storage,
    "product/" + typeName + "/" + itemName
  );

  remove(typeRef).then(() => {
    console.log("Item " + itemId + " remove");
  });
  deleteObject(itemRefStorage).then(() => {
    console.log("Item image remove: " + typeName + "/" + itemName);
  });
};
