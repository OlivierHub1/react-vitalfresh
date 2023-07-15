import { faPenToSquare, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {UserService} from '../../assets/service/userService';

export const User = () => {
  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  //Get user
  const userService = new UserService();
  const users = userService.getUsers();

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
        <h1 className="text-center">User List</h1>

        {users.map((user) => (
          <div className="row justify-content-center bg-light rounded m-5 p-2">
          <div className={`col align-self-center ${isMobile ? "mx-4" : ""}`}>
            <img
              src={"/src/assets/images/user/" + user.file}
              alt={user.username}
              className="img-round"
            />
          </div>
          <div className={`align-self-center ${isMobile ? "col-12 text-center my-3" : "col"}`}>
            <span className="btn btn-dark">{user.username}</span>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon icon={faTrash} size="2xl" />
            </button>
          </div>
        </div>

      ))}

        

        
      </section>
    </>
  );
}
