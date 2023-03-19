import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="home-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="home-content">
        <h1 className="heading">{t('homepage.title1')}</h1>

        <h2 className="sub1">{t('homepage.title2')}</h2>

        {!isAuthenticated ? (
          <button onClick={() => navigate('/login')} className="titleBtn">
            {t('homepage.title3.login')}
          </button>
        ) : (
          <button onClick={() => navigate('/user')} className="titleBtn">
            Doing quiz here!
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
