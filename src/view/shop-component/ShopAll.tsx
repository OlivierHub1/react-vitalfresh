import React, { useEffect, useState } from "react";
import data from "../../assets/data/item.json";
import { getItems } from "../../assets/service/itemService";

export const ShopAll = () => {
  //Get item
  const items = getItems();

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
        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          {items.map((item) => (
            <div className="col mb-2" key={item.id}>
              <div className="card p-2">
                <img src={item.file} alt={item.name} className="img-fluid" />
                <div className="container justify-content-center">
                  <h4>
                    <b>{item.name}</b>
                  </h4>
                  <p>{item.type + " | " + item.price + "$"}</p>
                  <button className="btn btn-dark w-100">ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
