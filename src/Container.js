import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./component/User/User";
import Admin from "./component/Admin/Admin";
import Home from "./component/Home/Home";
import ManageUser from "./component/Admin/content/ManageUser";
import DashBoard from "./component/Admin/content/DashBoard";
import Login from "./component/Authentication/Login";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faHome } from "@fortawesome/free-solid-svg-icons";

library.add(fas, faHome);
function Container() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="user" element={<User />}></Route>
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="manage-user" element={<ManageUser />}></Route>
            <Route index element={<DashBoard />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Container;
