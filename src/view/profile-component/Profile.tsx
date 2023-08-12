import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Footnote } from "../footnote-component/Footnote";
import { getUsers } from "../../service/userService";
import { User } from "../../entities/user";
import { Link } from "react-router-dom";
import "./Profile.css"

export const Profile = () => {
  const users = getUsers();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const userProfileData = getUserByUsername(username, users);
    setUserData(userProfileData);
  }, [users]);

  console.log(users);

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <div className="profile container rounded bg-green-shadow rounded mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 border-right bg-dark rounded">
            <div className="h-100 d-flex align-items-center">
              <img
                className="rounded-circle mx-auto d-block m-3"
                src={userData.file}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <h6 className="text-center">{userData.username}</h6>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label htmlFor="">First Name</label>
                  <p className="text-white">{userData.firstName}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Last Name</label>
                  <p className="text-white">{userData.lastName}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Email</label>
                  <p className="text-white">{userData.email}</p>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Money</label>
                  <p className="text-white">{userData.money + "$"}</p>
                </div>
              </div>
              <div className="mt-5 text-right">
                {renderBtnAdmin(userData.status)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footnote />
    </>
  );
};

function getUserByUsername(username: string, users: User[]) {
  return users.find((user) => user.username === username);
}

function renderBtnAdmin(condition: string) {
  if (condition == "admin") {
    return (
      <Link to={"/admin"} className="btn btn-dark">
        Edit data
      </Link>
    );
  }

  return null;
}
