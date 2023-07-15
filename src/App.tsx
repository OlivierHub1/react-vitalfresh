import { useState } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
//Page
import { Home } from "./view/home-component/Home";

import { Cart } from "./view/cart-component/Cart";
import { Profile } from "./view/profile-component/Profile";
import { Login } from "./view/connection-component/Login";
import { Signup } from "./view/connection-component/Signup";

//Page Shop
import { Shop } from "./view/shop-component/Shop";
import { ShopAll } from "./view/shop-component/ShopAll";
import { ShopSelect } from "./view/shop-component/ShopSelect";
import { ShopSearch } from "./view/shop-component/ShopSearch";

//Page Admin
import { Admin } from "./view/admin-component/Admin";
import { User } from "./view/admin-component/User";
import { Type } from "./view/admin-component/Type";
import { Item } from "./view/admin-component/Item";

//Inclusion
import { NavBar } from "./view/navbar-component/NavBar";
import { NotFound } from "./view/error-component/NotFound";

//Test
import { Test } from "./view/a-test/test";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}>
          <Route index element={<ShopAll />} />
          <Route path=":id" element={<ShopSelect />}/>
          <Route path="search/:search" element={<ShopSearch />} />
        </Route>
        <Route path="admin" element={true ? <Admin /> : <NotFound/>}>
          <Route path="user" element={<User />} />
          <Route path="type" element={<Type />} />
          <Route path="item" element={<Item />} />
        </Route>
        <Route path="cart" element={true ? <Cart /> : <NotFound/>} />
        <Route path="profile" element={true ? <Profile /> : <NotFound/>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="test" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
