import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import React, { useState } from "react";
import {
  getItems,
  addItem,
  editItem,
} from "../../../service/itemService";
import { getTypes } from "../../../service/typeService";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const ItemEdit = () => {
  //Navigation
  const navigate = useNavigate();

  //Get user
  const item = JSON.parse(localStorage.getItem("itemDataEdit"));

  //Item states
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [typeId, setTypeId] = useState(item.type);

  //Hidden data
  const id = item.id;
  const oldFile = item.file;

  //Get type
  const types = getTypes();

  //Upload File
  const [imageUpload, setImageUpload] = useState(null);

  const handleEditItem = async () => {
    let url = oldFile;

    if (imageUpload != null) {
      const imageRef = ref(
        storage,
        `product/${convertTypeId(Number(typeId))}/${imageUpload.name + v4()}`
      );
      const snapshot = await uploadBytes(imageRef, imageUpload);
      url = await getDownloadURL(snapshot.ref);
    }

    try {
      editItem(
        description,
        url,
        oldFile,
        id,
        name,
        Number(price),
        Number(typeId)
      );
      localStorage.setItem("itemDataEdit", "");
      navigate("/react-vitalfresh/admin");
    } catch (error) {
      //console.error("Error uploading image:", error);
    }
  };

  return (
    <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
      <h1 className="text-center text-white">Edit Item:</h1>
      <div className="mx-5">
        <div className="form-group my-2">
          <input type="hidden" value={id} />
          <input type="hidden" value={oldFile} />
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleDescription">Description</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleDescription">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleDescription">Choose type</label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
          >
            <option value="" disabled>
              Select Type
            </option>
            {types.map((type) => (
              <option value={type.id}>{type.name}</option>
            ))}
          </select>
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
              onClick={handleEditItem}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function convertTypeId(typeId: number) {
  let typeName = "";

  switch (Number(typeId)) {
    case 0:
      return (typeName = "fruits");
    case 1:
      return (typeName = "meats");
    case 2:
      return (typeName = "dairy");
    case 3:
      return (typeName = "vegetables");
    case 4:
      return (typeName = "grain");
  }
}
