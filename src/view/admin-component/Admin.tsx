import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Footnote } from "../footnote-component/Footnote";

export const Admin = () => {
  return (
    <>
      <section className="container bg-green-shadow rounded mt-5 p-3">
        <h1 className="text-center m-3 text-light">Admin</h1>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <Link to={"user"}>
              <button className="btn btn-dark">User</button>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <Link to={"type"}>
              <button className="btn btn-dark">Type</button>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <Link to={"item"}>
              <button className="btn btn-dark">Item</button>
            </Link>
          </div>
        </div>
      </section>
      <Outlet />
      <Footnote/>
    </>
  );
};
