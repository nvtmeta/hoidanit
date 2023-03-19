import NavDropdown from 'react-bootstrap/NavDropdown';

import { useTranslation, Trans } from 'react-i18next';

const Languages = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLang = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <NavDropdown
        className="languages"
        title={i18n.language === 'vi' ? 'Viet Nam' : 'English'}
        id="navbarScrollingDropdown-2"
      >
        <NavDropdown.Item onClick={() => handleChangeLang('vi')}>
          VietNam
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLang('en')}>
          English
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default Languages;
