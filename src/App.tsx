import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Page
import { Home } from "./view/home-component/Home";
import { Shop } from "./view/shop-component/Shop";
import { Admin } from "./view/admin-component/Admin";
import { Cart } from "./view/cart-component/Cart";
import { Profile } from "./view/profile-component/Profile";
import { Login } from "./view/connection-component/Login";
import { Signup } from "./view/connection-component/Signup";

//Inclusion
import { NavBar } from "./view/navbar-component/NavBar";
import { NotFound } from "./view/error-component/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="admin" element={<Admin />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
