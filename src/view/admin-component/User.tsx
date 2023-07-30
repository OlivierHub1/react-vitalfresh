import React, { useState, useEffect } from "react";
import {
  faPenToSquare,
  faTrash,
  faUser,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { addUser, deleteUser, getUsers } from "../../assets/service/userService";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

export const User = () => {
  //User states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [money, setMoney] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 76);

  //Get user
  const users = getUsers();

  //Set User
  const [items, setUsers] = useState([]);
  const [newItemName, setNewUserName] = useState("");

  //Delete User
  const handleDeleteUser = (userId: number, userFile:string) => {
    deleteUser(userId, userFile);
  };

  //Upload File
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

 // const imagesListRef = ref(storage, "user/");
 const handleAddUser = async () => {
  if (imageUpload == null) return;

  try {
    const imageRef = ref(storage, `user/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);

    addUser(email, url, firstName, users.length, lastName, money, password, status, username);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

  //UseEffect
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
      <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
      <h1 className="text-center text-white">Add new user</h1>
      <div className="mx-5">
        <div className="form-group my-2">
          <label htmlFor="exampleInputName">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputLastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputMoney">Money</label>
          <input
            type="number"
            min="0"
            className="form-control"
            placeholder="Enter money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleSelectStatus">Choose type</label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>Select Status</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="form-group my-5">
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <div className="col text-end">
          <button type="submit" className="btn btn-dark" onClick={handleAddUser}>
            Submit
          </button>
        </div>
      </div>
    </section>

      <section className="container home-products bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center">User List</h1>

        {users
          .filter((user) => user.status == "user") // Filter out the user with id 0
          .map((user) => (
            <div
              className="row justify-content-center bg-light rounded m-5 p-2"
              key={user.id}
            >
              <div className={"col align-self-center"}>
                <img
                  src={user.file}
                  alt={user.username}
                  className="img-round"
                />
              </div>
              <div
                className={`align-self-center ${
                  isMobile ? "col-12 text-center my-3" : "col"
                }`}
              >
                <span className="btn btn-dark">{user.username}</span>
              </div>
              <div className="col align-self-center">
                <button className="btn-remove-style">
                  <FontAwesomeIcon
                    className="blue-hover"
                    icon={faPenToSquare}
                    size="2xl"
                  />
                </button>
              </div>
              <div className="col align-self-center">
                <button className="btn-remove-style">
                  <FontAwesomeIcon icon={faUser} size="2xl" />
                </button>
              </div>
              <div className="col align-self-center">
                <button
                  className="btn-remove-style"
                  onClick={() => handleDeleteUser(Number(user.id), user.file)}
                >
                  <FontAwesomeIcon
                    className="red-hover"
                    icon={faTrash}
                    size="2xl"
                  />
                </button>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

