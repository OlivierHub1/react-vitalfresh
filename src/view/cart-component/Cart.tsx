import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowLeft,
  faAngleDown,
  faTrashAlt,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { Footnote } from "../footnote-component/Footnote";
import {
  deleteCart,
  deleteItemInCart,
  editQuantity,
  getCart,
} from "../../assets/service/cartService";
import { useNavigate } from "react-router-dom";
import { Cart as CartEnt } from "../../assets/entities/cart";
import { User } from "../../assets/entities/user";
import { editMoney, getUsers } from "../../assets/service/userService";
import { editUser } from "../../assets/service/userService";
import { MessageCart } from "../alert-component/Alert";

export const Cart = () => {
  //Cart
  const cart = getCart(localStorage.getItem("userName"));

  //User
  const users = getUsers();
  const [userData, setUserData] = useState<User | null>(null);

  //Message
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const userProfileData = getUserByUsername(username, users);
    setUserData(userProfileData);
  }, [users]);

  //Edit the quantity of an item
  const handleQuantity = (
    id: number,
    quantity: number,
    name: string,
    file: string,
    price: number,
    action: string
  ) => {
    const username = localStorage.getItem("userName");
    editQuantity(id, quantity, name, price, file, username, action);
  };

  //Delete item
  const handleDeleteItem = (id: number) => {
    const username = localStorage.getItem("userName");
    deleteItemInCart(id, username);
    window.location.reload();
  };

  //Checkout
  const handleCheckout = (username: string, money: number, users: User[]) => {
    if (itemTtotal(cart) == 0) {
      setMessage({
        result: "Alert",
        message: `Your purchase has not been made because there are nothing in the cart`,
        color: "danger",
      });
    } else {
      checkout(username, money, users);
      deleteCart(userData.username);
      setMessage({
        result: "Succes",
        message: `Your purchase has been made`,
        color: "success",
      });
    }
  };

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                <FontAwesomeIcon icon={faLongArrowLeft} />
                <span className="ml-2">Continue Shopping</span>
              </div>
              <hr />
              <h6 className="mb-0">Shopping cart</h6>
              <div className="d-flex justify-content-between">
                <span>You have 4 items in your cart</span>
                <div className="d-flex flex-row align-items-center"></div>
              </div>
              {cart !== null &&
                cart.map((item) => (
                  <div
                    className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded"
                    key={item.id}
                  >
                    <div className="d-flex flex-row">
                      <img
                        className="rounded m-3"
                        src={item.file}
                        width="40"
                        alt="Product"
                      />
                      <div className="ml-2">
                        <span className="font-weight-bold d-block">
                          {item.name}
                        </span>
                        <span className="spec">Item</span>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleQuantity(
                            item.id,
                            item.quantity,
                            item.name,
                            item.file,
                            item.price,
                            "+"
                          )
                        }
                      >
                        +
                      </button>
                      <span className="d-block m-2">{item.quantity}</span>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleQuantity(
                            item.id,
                            item.quantity,
                            item.name,
                            item.file,
                            item.price,
                            "-"
                          )
                        }
                      >
                        -
                      </button>
                      <span className="d-block font-weight-bold m-2">
                        {item.price * item.quantity}$
                      </span>
                      <button
                        className="btn btn-light"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-black-50 m-2"
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center">
                <span>Card details</span>
                <img
                  className="rounded"
                  src={userData.file}
                  width="30"
                  alt="Card Logo"
                />
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Money</span>
                <span>{userData.money}</span>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Cost</span>
                <span>{`${itemTtotal(cart)}$`}</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Taxes(15%)</span>
                <span>{`${(itemTtotal(cart) * 1.15).toFixed(2)}$`}</span>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Final</span>
                <span>{`${
                  Number(userData.money) - itemTtotal(cart) * 1.15
                }$`}</span>
              </div>
              <button
                className="btn btn-dark btn-block d-flex justify-content-between mt-3 w-100"
                type="button"
                onClick={() =>
                  handleCheckout(
                    userData.username,
                    Number(userData.money) - itemTtotal(cart) * 1.15,
                    users
                  )
                }
              >
                <span>{`${(itemTtotal(cart) * 1.15).toFixed(2)}$`}</span>
                <span>
                  Checkout
                  <FontAwesomeIcon icon={faLongArrowRight} className="ml-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footnote />
      {message && (
        <MessageCart
          result={message.result}
          message={message.message}
          color={message.color}
        />
      )}
    </>
  );
};

function itemTtotal(cart: CartEnt[]): number {
  let total = 0;
  cart.forEach((item) => (total += item.price * item.quantity));
  return total;
}

function getUserByUsername(username: string, users: User[]) {
  return users.find((user) => user.username === username);
}

function checkout(username: string, money: number, users: User[]) {
  const userData = getUserByUsername(username, users);
  editMoney(
    userData.email,
    userData.file,
    userData.firstName,
    userData.id,
    userData.lastName,
    money.toString(),
    userData.password,
    userData.status,
    userData.username
  );
}
