import React, { useEffect, useState } from "react";
import data from "../../assets/data/item.json";

export const ShopAll = () => {
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
          {data.item.map((item) => (
            <div className="col mb-2">
              <div className="card p-2">
                <img
                  src={
                    "/src/assets/images/product/" +
                    findType(item.type) +
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
                  <p>{findType(item.type) + " | " + item.price + "$"}</p>
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

function findType(typeId: number) {
  switch (typeId) {
    case 1:
      return "Fruits";
    case 2:
      return "Meats";
    case 3:
      return "Dairy";
    case 4:
      return "Vegetables";
    case 5:
      return "Grain";
    default:
      return null;
  }
}
