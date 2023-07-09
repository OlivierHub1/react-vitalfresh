import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "/src/assets/mystyle.css";
import "./Navbar.css";

export const NavBar = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-green-shadow">
          <div className="container">
            <a className="navbar-brand me-2" href="/">
              <img
                src="/src/assets/images/logos/vitalfresh-white.png"
                alt="VitalFresh-Logo"
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
                  <a className="nav-link">VITALFRESH</a>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="shop" className="nav-link">
                    SHOP
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="cart" className="nav-link">
                    CART
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="profile" className="nav-link">
                    PROFILE
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="admin" className="nav-link">
                    ADMIN
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <Link to="login">
                  <button type="button" className="btn btn-dark px-3 me-2">
                    Login
                  </button>
                </Link>
                <Link to="signup">
                  <button type="button" className="btn btn-light me-3">
                    Sign up for free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};
