import {
  faPenToSquare,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Type = () => {
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
      <section className="container home-products bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center">Add new type</h1>
        <form className="mx-5">
          <div className="form-group w-75 my-2">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group w-75 my-2">
            <label htmlFor="exampleDescription">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter description"
            />
          </div>
          <div className="form-group w-75 my-2">
            <label htmlFor="exampleDescription">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter price"
            />
          </div>
          <div className="form-group w-75 my-5">
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
        </form>
      </section>

      <section className="container home-products bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center">Type List</h1>

        <div className="row justify-content-center bg-light rounded m-5 p-2">
          <div className={`col align-self-center ${isMobile ? "mx-4" : ""}`}>
            <img
              src="/src/assets/images/product/type/fruits.png"
              alt="fruits"
              className="img-round"
            />
          </div>
          <div
            className={`align-self-center ${
              isMobile ? "col-12 text-center my-3" : "col"
            }`}
          >
            <Link to="user" className="btn btn-dark">
              Fruits
            </Link>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon icon={faTrash} size="2xl" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
