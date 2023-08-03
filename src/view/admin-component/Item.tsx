import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteItem, getItems } from "../../assets/service/itemService";

export const Item = () => {
  //Get item
  const items = getItems();
  
  //Delete Item
  const handleDeleteItem = (itemId: number, itemFile:string) => {
    deleteItem(itemId, itemFile);
  };

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
      <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center text-white">Add new item</h1>
        <form className="mx-5">
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleDescription">Description</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter description"
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleDescription">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price"
            />
          </div>
          <div className="form-group my-2">
          <label htmlFor="exampleDescription">Choose type</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="form-group my-5">
              <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
              />
            </div>
            <div className="col text-end">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center text-white">Item List</h1>

        

        {items.map((item) => (
          <div className="row justify-content-center bg-light rounded m-5 p-2">
          <div className={`col align-self-center ${isMobile ? "mx-4" : ""}`}>
            <img
              src={item.file}
              alt={item.name}
              className="img-round"
            />
          </div>
          <div
            className={`align-self-center ${
              isMobile ? "col-12 text-center my-3" : "col"
            }`}
          >
            <Link to={"/shop/search/" + item.name} className="btn btn-dark">
              {item.name}
            </Link>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="blue-hover" icon={faPenToSquare} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="red-hover" icon={faTrash} size="2xl" onClick={() => handleDeleteItem(Number(item.id), item.file)}/>
            </button>
          </div>
        </div>

      ))}

      </section>
    </>
  );
};
