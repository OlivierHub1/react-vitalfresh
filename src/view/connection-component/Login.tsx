import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { ReactSession } from 'react-client-session';
import { UserService } from "../../assets/service/userService";

export const Login = () => {
  //Get user
  const userService = new UserService();
  const users = userService.getUsers();

  //Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform authentication logic here, e.g., send a request to your API

    // Simulating a successful login
    if (username === "your_username" && password === "your_password") {
      // Set the session or authentication token
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to the home page or any other authenticated route
      window.location.href = "/";
    } else {
      // Show an error message for unsuccessful login
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="form rounded bg-green">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="rounded"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="btn btn-dark" type="submit">
            Login
          </button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
