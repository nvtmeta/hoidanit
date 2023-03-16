import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import Home from './component/Home/Home';
import ManageUser from './component/Admin/content/ManageUser';
import DashBoard from './component/Admin/content/DashBoard';
import Login from './component/Authentication/Login';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faHome } from '@fortawesome/free-solid-svg-icons';
import SignUp from './component/Authentication/SignUp';
import QuizList from './component/User/QuizList';
import DetailQuiz from './component/User/DetailQuiz';
import ManageQuiz from './component/Admin/content/Quiz/ManageQuiz';
import Questions from './component/Admin/content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
library.add(fas, faHome);

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      404 not found with your current quiz !
    </div>
  );
};

function Container() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route
              path="user"
              element={
                <PrivateRoute>
                  <QuizList />
                </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />}></Route>
          <Route
            path="admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route path="manage-user" element={<ManageUser />}></Route>
            <Route path="manage-quiz" element={<ManageQuiz />}></Route>
            <Route index element={<DashBoard />}></Route>
            <Route path="manage-questions" element={<Questions />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
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
