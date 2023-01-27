import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    //validate

    //submit API
    let res = await postLogin(email, password);
    console.log(res.EC !== 0);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
      // await fetchUser();
    }
    if (res && +res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="header ">
          Don't have an account yet ?
          <button className="btn-login-header">Login</button>
        </div>

        <div className="title col-4 mx-auto">Amazon</div>
        <div className="welcome col-4 mx-auto">Hello , who's this ?</div>
        <div className="content col-4 mx-auto">
          <div className="form-group ">
            <label className="email-label">Email</label>
            <input
              className="input-form"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            ></input>
            <label className="email-password">Password</label>
            <input
              className="input-form"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            ></input>
          </div>
          <div className=" footer-login col-4 mx-auto ">
            <span className="forgot-password">Forgot password ?</span>
            <div>
              {" "}
              <button className="btn-login" onClick={handleLogin}>
                Login to Amazon
              </button>
            </div>
            <div
              className="btn-returnHome text-center"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon="fas fa-home" className="icon-home " />
              Go to Homepage
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
