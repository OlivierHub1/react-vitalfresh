import React from "react";
import "./Profile.css";
import { Footnote } from "../footnote-component/Footnote";
import { UserService } from "../../assets/service/userService";

export const Profile = () => {
    //Get user
  const userService = new UserService();
  const userData = userService.getUserByUsername(localStorage.getItem("userName"));
  return (
    <>
      <div className="container rounded bg-green-shadow rounded mt-5 mb-5">
        <div className="row">
            <div className="col-md-4 border-right bg-dark rounded">
                <div className="h-100 d-flex align-items-center"><img className="rounded-circle mx-auto d-block" src={"/src/assets/images/user/" + userData.file}/></div>
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
                            <p className="text-white">{userData.money}</p>
                        </div>
                    </div>
                    <div className="mt-5 text-right"><button className="btn btn-dark" type="button">Save Profile</button></div>
                </div>
            </div>
        </div>
    </div>

    <Footnote/>
    </>
  );
};
