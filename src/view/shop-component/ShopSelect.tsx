import React, { useEffect, useState } from "react";
import data from "../../assets/data/item.json";
import { useParams } from "react-router-dom";
import { ItemService } from '../../assets/service/itemService';

export const ShopSelect = () => {
  //Get item
  const itemService = new ItemService();
  const items = itemService.getItems();

  //Get item by type with the id of the type
  const { id } = useParams();

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
        <div className={isMobile ? "row row-cols-1 g-1" : "row row-cols-3 g-3"}>
          {items.map((item) => {
            if (item.type === parseInt(id)) {
              return (
                <div className="col mb-2" key={item.id}>
                  <div className="card p-2">
                    <img
                      src={
                        "/src/assets/images/product/" +
                        itemService.getItemsByType(item.type) +
                        "/" +
                        item.file
                      }
                      alt={item.name}
                      className="img-fluid"
                    />
                    <div className="container justify-content-center">
                      <h4>
                        <b>{item.name}</b>
                      </h4>
                      <p>{itemService.getItemsByType(item.type) + " | " + item.price + "$"}</p>
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
