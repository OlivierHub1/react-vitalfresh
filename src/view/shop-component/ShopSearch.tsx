import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../assets/data/item.json";
import { getItems } from "../../assets/service/itemService";
import { getCart, addItemInCart } from "../../assets/service/cartService";
import { MessageConnection } from "../alert-component/Alert";

export const ShopSearch = () => {
  //Get item
  const items = getItems();

  //Get item by type with the id of the type
  const { search } = useParams();

  //Get Cart
  const cart = getCart(localStorage.getItem("userName"));

  //Verify connection
  const isConnected = localStorage.getItem("userName") != null;

  //Set message
  const [message, setMessage] = useState(null);

  //Add item into cart
  const handleAddItem = (
    id: number,
    price: number,
    file: string,
    name: string
  ) => {
    const username = localStorage.getItem("userName");
    if (!isConnected) {
      setMessage({
        result: "Bad",
        message: "You are not connected",
        color: "danger",
      });
    }

    if (cart.find((item) => item.name === name)) {
      return null;
    } else {
      addItemInCart(id, 1, name, price, file, username);
    }
  };

  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  //Responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!items) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <section className="home-products container bg-green-shadow rounded mb-3 pb-5">
        <h1 className="text-center">Our products</h1>

        {items.filter((item) => item.name.includes(search) || search === "")
          .length === 0 && (
          <h2 className="text-center text-danger bg-dark rounded">
            No result for: {search}
          </h2>
        )}

        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          {items.map((item) => {
            if (item.name.includes(search) || search === "") {
              return (
                <div className="col mb-2" key={item.id}>
                  <div className="card p-2">
                    <img
                      src={item.file}
                      alt={item.name}
                      className="img-fluid img-shop"
                    />
                    <div className="container justify-content-center">
                      <h4>
                        <b>{item.name}</b>
                      </h4>
                      <p>{item.price + "$"}</p>
                      <button
                        className="btn btn-dark w-100"
                        onClick={() =>
                          handleAddItem(
                            cart.length,
                            item.price,
                            item.file,
                            item.name
                          )
                        }
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        {message && (
          <MessageConnection
            result={message.result}
            message={message.message}
            color={message.color}
          />
        )}
      </section>
    </>
  );
};
