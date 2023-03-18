import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ActionLogin } from '../../redux/LoginAction/actionLogin';
import { ImSpinner6 } from 'react-icons/im';
import Languages from './../Header/Languages';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    //validate
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!password) {
      toast.error('Invalid password');
      return;
    }
    setIsLoading(true);
    //submit API
    let res = await postLogin(email, password);
    console.log(res.EC !== 0);
    if (res && res.EC === 0) {
      dispatch(ActionLogin(res));
      toast.success(res.EM);
      setIsLoading(false);
      navigate('/');
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
          <button
            className="btn-login-header"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
          <Languages />
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
              onKeyDown={(e) => handleKeypress(e)}
            ></input>
          </div>
          <div className=" footer-login col-4 mx-auto ">
            <span className="forgot-password">Forgot password ?</span>
            <div>
              <button
                className="btn-login"
                onClick={handleLogin}
                disabled={IsLoading}
              >
                {IsLoading === true && <ImSpinner6 className="loaderIcon" />}{' '}
                Login to Amazon
              </button>
            </div>
            <div
              className="btn-returnHome text-center"
              onClick={() => navigate('/')}
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
