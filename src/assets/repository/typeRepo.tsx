import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { Type } from "../entities/type";

export const getTypeData = () => {
    const [todoData, setTodoData] = useState<Type[]>([]);
  
    useEffect(() => {
        const startCountRef = ref(db, "type/");
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