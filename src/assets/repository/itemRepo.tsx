import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { User } from "../entities/user";
import { Item } from "../entities/item";

export const getItemData = () => {
    const [todoData, setTodoData] = useState<Item[]>([]);
  
    useEffect(() => {
        const startCountRef = ref(db, "item/");
        const unsubscribe = onValue(startCountRef, (snapshot) => {
          const data = snapshot.val();
          const newPosts = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          console.log(newPosts)
          setTodoData(newPosts);
        });
      
        return () => {
          unsubscribe();
        };
      }, []);      
  
    return todoData;
  };