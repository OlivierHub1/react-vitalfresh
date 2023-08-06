import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "/src/assets/mystyle.css";
import "./Navbar.css";
import { User } from "../../assets/entities/user";
import { getCart } from "../../assets/service/cartService";

//Handle logout
const handleLogut = () => {
  localStorage.clear();
  const navigate = useNavigate();
  navigate("/");
};

export const NavBar = () => {
  const [isMobile] = useState(window.innerWidth <= 768);
  const [isConnected] = useState(localStorage.getItem("userName") != null);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-green-shadow">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <a className="navbar-brand mt-2 mt-lg-0" href="#">
                <img
                  src="/src/assets/images/logos/vitalfresh-white.png"
                  className={isMobile ? "mx-auto d-block" : ""}
                  height="15"
                  alt="VitalFresh-Logo"
                  loading="lazy"
                  id="logo"
                />
              </a>

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className={`nav-link ${isMobile ? "text-center" : ""}`}>
                    VITALFRESH
                  </a>
                </li>
                {renderNavLink(true, "HOME", "/", isMobile)}
                {renderNavLink(true, "SHOP", "shop", isMobile)}
                {renderNavLink(isConnected, "PROFILE", "profile", isMobile)}
              </ul>
            </div>

            <div className="d-flex align-self-center">
              {renderConnectionLink(
                !isConnected,
                "login",
                "Login",
                "btn-dark p-2"
              )}
              {renderConnectionLink(
                !isConnected,
                "signup",
                "Sign Up",
                "btn-light p-2"
              )}
              {renderUserOption(isConnected)}
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

//Render nav-item
function renderNavLink(
  condition: boolean,
  name: string,
  link: string,
  isMobile: boolean
) {
  if (condition) {
    return (
      <li className={`nav-item ${isMobile ? "text-center" : ""}`}>
        <NavLink to={link} className="nav-link rounded">
          {name}
        </NavLink>
      </li>
    );
  }
  return null;
}

function renderConnectionLink(
  condition: boolean,
  link: string,
  name: string,
  style: string
) {
  if (condition) {
    return (
      <Link to={link}>
        <button type="button" className={"btn px-3 me-2 " + style}>
          {name}
        </button>
      </Link>
    );
  }
  return null;
}

function renderUserOption(condition: boolean) {
  const cart = getCart(localStorage.getItem("userName"))
  if (condition) {
    return (
      <div className="d-flex flex-row">
        <Link className="text-reset me-3" to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="badge rounded-pill badge-notification bg-danger">
          {cart.length}
        </span>
        
      </Link>
      <div className="dropdown d-flex justify-content-center">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow text-reset"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           <FontAwesomeIcon icon={faUser}/>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <Link className="dropdown-item text-black" to={"/profile"}>
              My profile
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item text-black"
              to={"/"}
              onClick={handleLogut}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
      </div>
    );
  }
  return null;
}

function getUserByUsername(username: string, users: User[]) {
  return users.find((user) => user.username === username);
}
