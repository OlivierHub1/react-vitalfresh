import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../assets/data/item.json";
import { getItems } from "../../assets/service/itemService";

export const ShopSearch = () => {
  //Get item
  const items = getItems();

  //Get item by type with the id of the type
  const { search } = useParams();

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
                      className="img-fluid"
                    />
                    <div className="container justify-content-center">
                      <h4>
                        <b>{item.name}</b>
                      </h4>
                      <p>{item.type + " | " + item.price + "$"}</p>
                      <button className="btn btn-dark w-100">
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
      </section>
    </>
  );
};
