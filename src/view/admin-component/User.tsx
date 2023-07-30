import React, { useState, useEffect } from "react";
import {
  faPenToSquare,
  faTrash,
  faUser,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../assets/service/userService";

export const User = () => {
  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 76);

  //Get user
  //const userService = new UserService();
  const users = getUsers();

  //Set User
  const [items, setUsers] = useState([]);
  const [newItemName, setNewUserName] = useState("");

  //Delete User
  const handleDeleteUser = (userId: number) => {
    deleteUser(userId);
  };

  //UseEffect
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
        <h1 className="text-center text-white">Add new user</h1>
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

      <section className="container home-products bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center">User List</h1>

        {users
          .filter((user) => user.status == "user") // Filter out the user with id 0
          .map((user) => (
            <div
              className="row justify-content-center bg-light rounded m-5 p-2"
              key={user.id}
            >
              <div className={"col align-self-center"}>
                <img
                  src={user.file}
                  alt={user.username}
                  className="img-round"
                />
              </div>
              <div
                className={`align-self-center ${
                  isMobile ? "col-12 text-center my-3" : "col"
                }`}
              >
                <span className="btn btn-dark">{user.username}</span>
              </div>
              <div className="col align-self-center">
                <button className="btn-remove-style">
                  <FontAwesomeIcon
                    className="blue-hover"
                    icon={faPenToSquare}
                    size="2xl"
                  />
                </button>
              </div>
              <div className="col align-self-center">
                <button className="btn-remove-style">
                  <FontAwesomeIcon icon={faUser} size="2xl" />
                </button>
              </div>
              <div className="col align-self-center">
                <button
                  className="btn-remove-style"
                  onClick={() => handleDeleteUser(Number(user.id))}
                >
                  <FontAwesomeIcon
                    className="red-hover"
                    icon={faTrash}
                    size="2xl"
                  />
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};
