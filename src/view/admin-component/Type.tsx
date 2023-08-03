import {
  faPenToSquare,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteType, getTypes } from "../../assets/service/typeService";


export const Type = () => {
  //Get type
  const types = getTypes();

  //Delete Type
  const handleDeleteType = (typeId: number, typeFile:string) => {
    deleteType(typeId, typeFile);
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
        <h1 className="text-center text-white">Add new type</h1>
        <form className="mx-5">
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleDescription">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter description"
            />
          </div>
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
        </form>
      </section>

      <section className="container home-products bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center">Type List</h1>

        

        {types.map((type) => (
          <div className="row justify-content-center bg-light rounded m-5 p-2">
          <div className={`col align-self-center ${isMobile ? "mx-4" : ""}`}>
            <img
              src={type.file}
              alt={type.name}
              className="img-round"
            />
          </div>
          <div
            className={`align-self-center ${
              isMobile ? "col-12 text-center my-3" : "col"
            }`}
          >
            <Link to={"/shop/" + type.id} className="btn btn-dark">
              {type.name}
            </Link>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="blue-hover" icon={faPenToSquare} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="red-hover" icon={faTrash} size="2xl" onClick={() => handleDeleteType(Number(type.id), type.file)}/>
            </button>
          </div>
        </div>
      ))}
      </section>
    </>
  );
};
