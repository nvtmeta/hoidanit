import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import Home from "./component/Home/Home";
import ManageUser from "./component/Admin/content/ManageUser";
import DashBoard from "./component/Admin/content/DashBoard";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="user" element={<User />}></Route>
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route path="manage-user" element={<ManageUser />}></Route>
          <Route index element={<DashBoard />}></Route>
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
