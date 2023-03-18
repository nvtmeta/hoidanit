import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import './signup.scss';
import { postSignUp } from '../../services/apiService';
import Languages from '../Header/Languages';
function SignUp() {
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!isVisible);
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
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
    //submit API
    let res = await postSignUp(email, password, userName);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate('/login');
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
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <Languages />
        </div>

        <div className="title col-4 mx-auto">Amazon</div>
        <div className="welcome col-4 mx-auto">Build your world !</div>
        <div className="content col-4 mx-auto">
          <div className="form-group ">
            <label className="email-label">Email (*)</label>
            <input
              required
              className="input-form"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            ></input>
            <div className="password-form">
              {' '}
              <label className="email-password">Password (*)</label>{' '}
              <input
                required
                className="input-form"
                type={!isVisible ? 'password' : 'text'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              ></input>
              <span>
                <FontAwesomeIcon
                  icon={isVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                  className="icon-eye"
                  onClick={toggle}
                />
              </span>
            </div>
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
              {' '}
              <button className="btn-login" onClick={handleLogin}>
                Create your Amazon's account
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

export default SignUp;
