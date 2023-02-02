import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="home-content">
        <h1 className="heading">There's a better way to ask</h1>
        <h2 className="sub1">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </h2>

        {!isAuthenticated ? (
          <button onClick={() => navigate("/login")} className="titleBtn">
            Get started - it's free
          </button>
        ) : (
          <button onClick={() => navigate("/user")} className="titleBtn">
            Doing quiz here!
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
