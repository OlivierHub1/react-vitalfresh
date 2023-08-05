import { uploadBytes, getDownloadURL } from '@firebase/storage';
import { ref } from 'firebase/storage';
import React, { useState } from 'react'
import { getItems, addItem } from '../../../assets/service/itemService';
import { getTypes } from '../../../assets/service/typeService';
import { storage } from '../../../firebase';
import { v4 } from "uuid";

export const ItemEdit = () => {
    //Item states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [typeId, setTypeId] = useState("");

  //Upload File
  const [imageUpload, setImageUpload] = useState(null);

  //Get type
  const types = getTypes();

  //Get item
  const items = getItems();

  //Add type
  const handleEditItem = async () => {
    if (imageUpload == null) return;

    try {
      const imageRef = ref(storage, `theme/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

      addItem(
        description,
        url,
        items.length,
        name,
        Number(price),
        Number(typeId)
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  return (
    <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center text-white">Edit Item:</h1>
        <div className="mx-5">
          <div className="form-group my-2">
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
              onChange={(e) => setTypeId(e.target.value)}
            >
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
  )
}
