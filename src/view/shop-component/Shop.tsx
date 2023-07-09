import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCartPlus,
  faSearch,
  faShoppingCart,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { Footnote } from "../footnote-component/Footnote";

export const Shop = () => {
  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="container mt-5 mb-3">
        <div className="row justify-content-center">
          <div className={`input-group mb-3 ${isMobile ? "w-100" : "w-50"}`}>
            <input
              type="text"
              className="form-control"
              placeholder="Search a product"
              aria-label="Search a product"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-dark">
                Search
              </button>
            </div>
          </div>
          <select className={`form-select h-25 ${isMobile ? "w-100" : "w-50"}`}>
            <option selected>Type</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </section>

      <section className="home-products container bg-green-shadow rounded mb-3 pb-5">
        <h1 className="text-center">Our products</h1>
        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          <div className="col">
            <div className="card p-2">
              <img
                src="/src/assets/images/product/fruits/apple.png"
                alt="Avatar"
                className="w-100"
              />
              <div className="container justify-content-center">
                <h4>
                  <b>Apple</b>
                </h4>
                <p>Fruit | $0.99</p>
                <button className="btn btn-dark w-100">ADD TO CART</button>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <Footnote />
    </>
  );
};
