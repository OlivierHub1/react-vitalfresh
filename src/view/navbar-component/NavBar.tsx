import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "../../assets/service/userService";
import "/src/assets/mystyle.css";
import "./Navbar.css";

//Get user
const userService = new UserService();
const userData = userService.getUserByUsername(localStorage.getItem("userName"));
let isAdmin = false;

//Handle logout
const handleLogut = () => {
  localStorage.clear();
  const navigate = useNavigate();
  navigate("/");
};

export const NavBar = () => {
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

  //Verify user connection
  const isConnected = localStorage.getItem("userName") != null;

  //Verify admin
  if(isConnected){
    isAdmin = userData.status == "admin";
  }
  
  
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
                  className={isMobile ? "mx-auto d-block": ""}
                  height="15"
                  alt="VitalFresh-Logo"
                  loading="lazy"
                  id="logo"
                />
              </a>

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className={`nav-link ${isMobile ? "text-center": ""}`}>
                    VITALFRESH
                  </a>
                </li>
                {renderNavLink(true, "HOME", "/", isMobile)}
                {renderNavLink(true, "SHOP", "shop", isMobile)}
                {renderNavLink(isConnected, "PROFILE", "profile", isMobile)}
                {renderNavLink(isAdmin, "ADMIN", "admin", isMobile)}
              </ul>
            </div>

            <div className="d-flex align-self-center">
              {renderConnectionLink(!isConnected, "login", "Login", "btn-dark p-2")}
              {renderConnectionLink(!isConnected, "signup", "Sign Up", "btn-light p-2")}
              {renderCartLink(isConnected, "cart", "")}
              {renderProfileLink(isConnected, "")}
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
function renderNavLink(condition: boolean, name: string, link: string, isMobile:boolean) {
  if (condition) {
    return (
      <li className={`nav-item ${isMobile ? "text-center":""}`}>
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

function renderCartLink(condition: boolean, link: string, style: string) {
  if (condition) {
    return (
      <Link className={"text-reset me-3 " + style} to={link}>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="badge rounded-pill badge-notification bg-danger">
          1
        </span>
      </Link>
    );
  }
  return null;
}

function renderProfileLink(condition: boolean, style:string) {
  if (condition) {
    return (
      <div className={"dropdown" + style}>
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={"/src/assets/images/user/" + userData.file}
            className="rounded-circle"
            height="25"
            width="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
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
            <Link className="dropdown-item text-black" to={"/"} onClick={handleLogut}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return null;
}
