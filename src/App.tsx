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
import { Item } from "./view/admin-component/Item";
import { UserEdit } from "./view/admin-component/edit/UserEdit";
import { ItemEdit } from "./view/admin-component/edit/ItemEdit";

//Inclusion
import { NavBar } from "./view/navbar-component/NavBar";
import { NotFound } from "./view/error-component/NotFound";

//Test
import { Test } from "./view/a-test/test";
import { File } from "./view/a-test/File";

//Verify user connection
const isConnected = localStorage.getItem("userName") != null;
const isAdmin = localStorage.getItem("admin") == "admin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />}>
          <Route index element={<ShopAll />} />
          <Route path=":typeId" element={<ShopSelect />} />
          <Route path="search/:search" element={<ShopSearch />} />
        </Route>
        <Route path="admin" element={isAdmin ? <Admin /> : <NotFound />} errorElement={<NotFound />}>
          <Route path="user" element={<User />}/>
          <Route path="item" element={<Item />}/>
          <Route path="user/edit" element={<UserEdit />} />
          <Route path="item/edit" element={<ItemEdit />} />
        </Route>
        <Route path="cart" element={true ? <Cart /> : <NotFound />} />
        <Route
          path="profile"
          element={isConnected ? <Profile /> : <NotFound />}
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="test" element={<Test />} />
        <Route path="file" element={<File />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
