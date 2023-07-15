import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

export const Signup = () => {
  return (
    <div className="login-page">
      <div className="form bg-green rounded">
        <form className="login-form">
          <input className="rounded" type="text" placeholder="username" />
          <input className="rounded" type="email" placeholder="email" />
          <input className="rounded" type="password" placeholder="password" />
          <input className="rounded" type="password" placeholder="confirm password" />
          <button className="btn btn-dark">Sign Up</button>
          <p className="message">
            Registered? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
