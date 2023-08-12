import React, { useState, useEffect } from "react";
import { ref, onValue, remove, child, set } from "firebase/database";
import { db, storage } from "../firebase";
import { Type } from "../entities/type";
import { deleteObject, ref as storageRef } from "@firebase/storage";

export const getTypesData = () => {
  const [todoData, setTodoData] = useState<Type[]>([]);

  useEffect(() => {
    const startCountRef = ref(db, "type/");
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

export const addNewType = (
  description: string,
  file: string,
  id: number,
  name: string
) => {
  const typeRef = ref(db, "type/");

  const newType = {
    description: description,
    file: file,
    id: id,
    name: name,
  };

  set(child(typeRef, String(id)), newType);
};

export const deleteTypeData = (typeId: number, typeFile: string) => {
  //Delete user
  const typeRef = ref(db, "type/" + typeId);

  //Delete file
  const startIndex = typeFile.lastIndexOf("%2F") + 3;
  const endIndex = typeFile.indexOf("?");
  const typeRefStorage = storageRef(
    storage,
    "theme/" + typeFile.substring(startIndex, endIndex)
  );

  remove(typeRef).then(() => {
    console.log("Type " + typeId + " remove");
  });
  deleteObject(typeRefStorage).then(() => {
    console.log("Type image remove");
  });
};
