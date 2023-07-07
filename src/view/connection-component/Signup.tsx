import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";

export const Signup = () => {
  return (
    <div className="login-page">
      <div className="form">
        <form className="register-form">
          <input type="text" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="text" placeholder="email address" />
          <button>create</button>
          <p className="message">
            Already registered? <a href="#">Sign In</a>
          </p>
        </form>
        <form className="login-form">
          <input type="text" placeholder="username" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <button>SIGN UP</button>
          <p className="message">
            Registered? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
