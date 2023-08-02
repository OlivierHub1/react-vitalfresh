import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { User } from "../../assets/entities/user";
import { getUsers } from "../../assets/service/userService";

export const Login = () => {
  //Get user
  const usersData = getUsers();
  console.log(usersData)
  //const userService = new UserService();

  //Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyUserExist(username, password, usersData)) {
      window;
      localStorage.setItem("userName", username);

      if (verifyUserStatus(username, usersData)) {
        localStorage.setItem("admin", "admin");
      }

      window.location.href = "/";
    } else {
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

function verifyUserExist(username, password, usersData:User[]){
  const user = usersData.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
}

function verifyUserStatus(username, usersData:User[]){
  const user = usersData.find(
    (user) => user.username === username
  );
  return user.status == "admin";
}