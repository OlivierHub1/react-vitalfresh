import { ref, onValue, set, child, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Cart } from "../entities/cart";

export const getCartData = (username: string) => {
  const [todoData, setTodoData] = useState<Cart[]>([]);

  useEffect(() => {
    const cartRef = ref(db, "cart/" + username);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      //console.log(newPosts)
      setTodoData(newPosts);
    });
  }, []);
  
  return todoData;
};

export const addNewItemInCart = (
  id: number,
  quantity: number,
  name: string,
  price: number,
  file: string,
  username: string
) => {
  const cartRef = ref(db, "cart/" + username);

  const newItem = {
    file: file,
    id: id,
    name: name,
    price: price,
    quantity: quantity,
  };

  set(child(cartRef, String(id)), newItem);
};

export const editQuantityData = (
  id: number,
  quantity: number,
  name: string,
  price: number,
  file: string,
  username: string,
  action: string
) => {
  const cartRef = ref(db, `cart/${username}/${id}`);
  if (action == "+") {
    set(cartRef, {
      file: file,
      id: id,
      name: name,
      price: price,
      quantity: quantity + 1,
    });
  } else if (action == "-") {
    if(quantity > 1)
    set(cartRef, {
        file: file,
        id: id,
        name: name,
        price: price,
        quantity: quantity - 1,
      });
  }
};

export const deleteItemInCartData = (id: number, username: string) => {
  //Delete item
  const cartRef = ref(db, `cart/${username}/${id}`);

  remove(cartRef).then(() => {
    //console.log("Item " + id + " remove");
  });
};

export const deleteCartData = (username: string) => {
  //Delete item
  const cartRef = ref(db, `cart/${username}`);

  remove(cartRef).then(() => {
    //console.log(`${username} cart deleted`);
  });
};

