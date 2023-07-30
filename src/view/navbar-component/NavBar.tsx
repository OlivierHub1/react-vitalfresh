import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../../assets/service/userService";
import "/src/assets/mystyle.css";
import "./Navbar.css";
import { Console } from "console";
import { User } from "../../assets/entities/user";
import { getUserData } from "../../assets/repository/userRepo";

//Handle logout
const handleLogut = () => {
  localStorage.clear();
  const navigate = useNavigate();
  navigate("/");
};

export const NavBar = () => {
  //Get user
  //const userService = new UserService();
  //const users = userService.getUsers();
  //const userData = getUserByUsername(localStorage.getItem("userName"));
  //console.log(userData);
  //console.log(userData.file);
  // Control size mobile (768) responsive
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userFile, setUserFile] = useState("");

  //Get User
  const users = getUsers();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("userName");
    const userProfileData = getUserByUsername(username, users);
    setIsConnected(username != null);
    setUserData(userProfileData);
  }, []);

  //console.log(userData)

  /*if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
        </div>
      </div>
    );
  }*/

  //console.log(userData)
  //const username = localStorage.getItem("userName");
  //setIsConnected(username != null);

  /*if(isConnected){
    //setUserData(userData => userData = getUserData(0))
    setIsAdmin(userData.status == "admin")
    setUserFile(userData.file)
  }*/

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
                {renderNavLink(true, "ADMIN", "admin", isMobile)}
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
              {renderCartLink(isConnected, "cart", "")}
              {renderProfileLink(isConnected, "", userFile)}
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

function renderProfileLink(condition: boolean, style: string, file:string) {
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
            src={"/src/assets/images/user/" + file}
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
    );
  }
  return null;
}

function getUserByUsername(username: string, users: User[]) {
  return users.find((user) => user.username === username);
}
