import React from "react";
import "./Profile.css";
import { Footnote } from "../footnote-component/Footnote";

export const Profile = () => {
  return (
    <>
      <div className="container rounded bg-green-shadow rounded mt-5 mb-5">
        <div className="row">
            <div className="col-md-4 border-right bg-dark rounded p-0 text-white">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5 "><img className="rounded-circle mt-5" src="/src/assets/images/user/Walt.png" width="90"/><span className="font-weight-bold">Walt</span><span className="text-white-50">walt@gmail.com</span><span>United States</span></div>
            </div>
            <div className="col-md-8">
                <div className="p-3 py-5">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h6 className="text-center">Money: 1000000$</h6>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="first name" value="John"/></div>
                        <div className="col-md-6"><input type="text" className="form-control" value="Doe" placeholder="Doe"/></div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Email" value="john_doe12@bbb.com"/></div>
                        <div className="col-md-6"><input type="text" className="form-control" value="+19685969668" placeholder="Phone number"/></div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="address" value="D-113, right avenue block, CA,USA"/></div>
                        <div className="col-md-6"><input type="text" className="form-control" value="USA" placeholder="Country"/></div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6"><input type="text" className="form-control" placeholder="Bank Name" value="Bank of America"/></div>
                        <div className="col-md-6"><input type="text" className="form-control" value="043958409584095" placeholder="Account Number"/></div>
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
