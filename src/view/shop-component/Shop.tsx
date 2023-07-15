import React, { useEffect, useState } from "react";
import { Footnote } from "../footnote-component/Footnote";
import data from "../../assets/data/type.json";
import { Outlet, useNavigate } from "react-router-dom";

export const Shop = () => {

  //Navigation
  const navigate = useNavigate();

  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  //Responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Select type
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    navigate(`/shop/${value}`);
  };

  //Search item
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput != "") {
      navigate(`/shop/search/${searchInput}`);
    } else {
      navigate(`/shop`);
    }
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <section className="container mt-5 mb-3">
        <div className="row justify-content-center">
          <form
            onSubmit={handleSearch}
            className={`input-group mb-3 ${isMobile ? "w-100" : "w-50"}`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search a product"
              aria-label="Search a product"
              aria-describedby="basic-addon2"
              value={searchInput}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </div>
          </form>
          <select
            className={`form-select h-25 ${isMobile ? "w-100" : "w-50"}`}
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option disabled>Select type</option>
            {data.type.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <Outlet />

      <Footnote />
    </>
  );
};
