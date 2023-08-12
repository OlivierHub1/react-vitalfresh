import React from "react";
import {
  addNewItemInCart,
  getCartData,
  editQuantityData,
  deleteItemInCartData,
  deleteCartData,
} from "../repository/cartRepo";

export const getCart = (username: string) => {
  const cart = getCartData(username);
  return cart;
};

export const addItemInCart = (
  id: number,
  quantity: number,
  name: string,
  price: number,
  file: string,
  username: string
) => {
  addNewItemInCart(id, quantity, name, price, file, username);
};

export const editQuantity = (
  id: number,
  quantity: number,
  name: string,
  price: number,
  file: string,
  username: string,
  action: string
) => {
  editQuantityData(id, quantity, name, price, file, username, action);
};

export const deleteItemInCart = (id: number, username: string) => {
  deleteItemInCartData(id, username);
};

export const deleteCart = (username: string) => {
  deleteCartData(username);
};
