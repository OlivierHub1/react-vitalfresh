import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { addUser, getUsers } from "../../assets/service/userService";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { User } from "../../assets/entities/user";
import { Message } from "../alert-component/Alert";


export const Signup = () => {
  //Get user
  const users = getUsers();

  //Navigation
  const navigate = useNavigate();

  //Message
  const [message, setMessage] = useState(null);

  //SignUp statement
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const handleSignup = async () => {
    if (imageUpload == null) return;

    if (password !== password2) {
      setMessage({
        result: "Alert",
        message: `The two password that you provided are not the same`,
        color: "danger",
      });
    }
  
    else if (!verifyUserExist(username, email, users)) {
      try {
      const imageRef = ref(storage, `user/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
  
      addUser(email, url, firstName, users.length, lastName, "500", password, "user", username);
      navigate("/login")
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    }

    else{
      setMessage({
        result: "Alert",
        message: `The username or email already exist`,
        color: "danger",
      });
    }
    
  }

  return (
    <div className="login-page">
      <div className="form bg-green rounded">
        <div className="login-form">
          <input
            className="rounded"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="rounded"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="rounded"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="rounded"
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <button className="btn btn-dark" type="submit" onClick={handleSignup}>
            Sign Up
          </button>
          <p className="message">
            Registered? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
      {message && (
        <Message
          result={message.result}
          message={message.message}
          color={message.color}
        />
      )}
    </div>
  );
};

function verifyUserExist(username, email, usersData:User[]){
  const user = usersData.find(
    (user) => user.username === username || user.email === email
  );
  return user !== undefined;
}