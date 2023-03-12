import Header from './component/Header/Header';
import { Outlet } from 'react-router-dom';
import './App.scss';
import PerfectScrollbar from 'react-perfect-scrollbar';

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container"></div>
      <div className="app-content">
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default App;
