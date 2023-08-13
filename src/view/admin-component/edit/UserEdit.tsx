import React, { useState } from "react";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { editUser } from "../../../service/userService";
import { useNavigate } from "react-router-dom";

export const UserEdit = () => {
  //Navigation
  const navigate = useNavigate();

  //Get user
  const user = JSON.parse(localStorage.getItem("userDataEdit"));

  //User states
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [money, setMoney] = useState(user.money);
  const [password, setPassword] = useState(user.password);
  const [status, setStatus] = useState(user.status);

  //Hidden data
  const id = user.id;
  const oldFile = user.file;

  //Upload File
  const [imageUpload, setImageUpload] = useState(null);

  const handleEditUser = async () => {
    try {
      let url = oldFile;

      if (imageUpload != null) {
        const imageRef = ref(storage, `user/${imageUpload.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        url = await getDownloadURL(snapshot.ref);
      }

      editUser(
        email,
        url,
        oldFile,
        firstName,
        Number(id),
        lastName,
        money,
        password,
        status,
        username
      );
      localStorage.setItem("userDataEdit", "");
      navigate("/react-vitalfresh/admin");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
      <h1 className="text-center text-white">
        {"Edit user: " + user.username}
      </h1>
      <div className="mx-5">
        <input type="hidden" value={id} />
        <input type="hidden" value={oldFile} />
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
            <option value="" disabled>
              Select Status
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="form-group my-5">
          <input
            className="form-control form-control-lg"
            id="formFileLg"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <div className="col text-end">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleEditUser}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};
