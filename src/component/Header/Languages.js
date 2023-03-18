import NavDropdown from 'react-bootstrap/NavDropdown';

const Languages = () => {
  return (
    <div>
      <NavDropdown
        className="languages"
        title="Viet Nam"
        id="navbarScrollingDropdown-2"
      >
        <NavDropdown.Item>VietNam</NavDropdown.Item>
        <NavDropdown.Item>English</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default Languages;
