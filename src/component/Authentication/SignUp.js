import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "./signup.scss";
import { postSignUp } from "../../services/apiService";
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const handleLogin = async () => {
    //validate

    //submit API
    let res = await postSignUp(email, password, userName);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
      // await fetchUser();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="header ">
          <span>Already have an account ?</span>
          <button
            className="btn-login-header"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <div className="title col-4 mx-auto">Amazon</div>
        <div className="welcome col-4 mx-auto">Build your world !</div>
        <div className="content col-4 mx-auto">
          <div className="form-group ">
            <label className="email-label">Email (*)</label>
            <input
              className="input-form"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            ></input>
            <label className="email-password">Password (*)</label>
            <input
              className="input-form"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            ></input>
            <label className="email-password">Username</label>
            <input
              className="input-form"
              type=""
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className=" footer-login col-4 mx-auto ">
            <div>
              {" "}
              <button className="btn-login" onClick={handleLogin}>
                Create your Amazon's account
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

export default SignUp;
