import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import '/src/assets/mystyle.css';
import './Navbar.css';

export const NavBarLogin = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-green-shadow">
      <div className="container">
        <a className="navbar-brand me-2" href="https://mdbgo.com/">
          <img
            src="src/assets/images/logos/vitalfresh-white.png"
            alt="MDB Logo"
            loading="lazy"
            id="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                VITALFRESH
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                PRODUCTS
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button type="button" className="btn btn-dark px-3 me-2">
              Login
            </button>
            <button type="button" className="btn btn-light me-3">
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </nav>
    </header>
    
  );
};
