import Header from "./component/Header/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container"></div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
