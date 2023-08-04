import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addItem, deleteItem, getItems } from "../../assets/service/itemService";
import { addType, getTypes } from "../../assets/service/typeService";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

export const Item = () => {
  //Item states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [typeId, setTypeId] = useState('');

  //Upload File
  const [imageUpload, setImageUpload] = useState(null);

  //Get type
  const types = getTypes();

  //Get item
  const items = getItems();

  //Add type
  const handleAddItem = async () => {
    if (imageUpload == null) return;

    try {
      const imageRef = ref(storage, `theme/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

      addItem(description, url, items.length, name, Number(price), Number(typeId))
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  //Delete Item
  const handleDeleteItem = (itemId: number, itemFile:string) => {
    deleteItem(itemId, itemFile);
  };

  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Scrollbar always in top
  const handleScrollBar = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center text-white">Add new item</h1>
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
            <select className="form-select" aria-label="Default select example" onChange={(e) => setTypeId(e.target.value)}>
              {types.map((type) => (
                <option value={type.id} >{type.name}</option>
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
              <button type="submit" className="btn btn-dark" onClick={handleAddItem}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container bg-green-shadow rounded mt-5 mb-3 pb-5">
        <h1 className="text-center text-white">Item List</h1>

        

        {items.map((item) => (
          <div className="row justify-content-center bg-light rounded m-5 p-2">
          <div className={`col align-self-center ${isMobile ? "mx-4" : ""}`}>
            <img
              src={item.file}
              alt={item.name}
              className="img-round"
            />
          </div>
          <div
            className={`align-self-center ${
              isMobile ? "col-12 text-center my-3" : "col"
            }`}
          >
            <Link to={"/shop/search/" + item.name} className="btn btn-dark" onClick={handleScrollBar}>
              {item.name}
            </Link>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="blue-hover" icon={faPenToSquare} size="2xl" />
            </button>
          </div>
          <div className="col align-self-center">
            <button className="btn-remove-style">
              <FontAwesomeIcon className="red-hover" icon={faTrash} size="2xl" onClick={() => handleDeleteItem(Number(item.id), item.file)}/>
            </button>
          </div>
        </div>

      ))}

      </section>
    </>
  );
};

