import videoHomepage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
function Home() {
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
        <button className="titleBtn">Get started - it's free</button>
      </div>
    </div>
  );
}

export default Home;
