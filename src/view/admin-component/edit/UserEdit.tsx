import React, { useState } from "react";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { editUser, getUser } from "../../../assets/service/userService";
import { useNavigate, useParams } from "react-router-dom";

export const UserEdit = () => {
  //Navigation
  const navigate = useNavigate();
  //Get user
  const { userId } = useParams();
  const user = getUser(Number(userId));

  //User states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [money, setMoney] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  //Hidden data
  const id = userId;
  const oldFile = user.file;

  //console.log(id)
  //Upload File
  const [imageUpload, setImageUpload] = useState(null);

  const handleEditUser = async () => {
    if (imageUpload == null) return;

    try {
      const imageRef = ref(storage, `user/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

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
      navigate("/admin");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  /*if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }*/

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
