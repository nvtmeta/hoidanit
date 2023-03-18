import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.scss';
import { logOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { ActionLogOut } from './../../redux/LoginAction/actionLogin';
import Languages from './Languages';
function Header() {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogOut = async () => {
    let res = await logOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      // clean data redux
      dispatch(ActionLogOut());
      navigate('/login');
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <Navbar bg="light" expand="lg" c lassName="header">
      <Container fluid>
        <NavLink to="/" className="navbar-brand">
          Amazon
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/user">
              User
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </Nav>

          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-signIn" onClick={handleLogin}>
                  Sign in
                </button>
                <button
                  className="btn-signUp"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <NavDropdown title="Setting" id="navbarScrollingDropdown">
                  <NavDropdown.Item>
                    <uutton onClick={() => handleLogOut()}>Sign out</uutton>
                  </NavDropdown.Item>
                </NavDropdown>
                <Languages />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
