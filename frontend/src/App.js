/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import Footer from './pages/footer';
import mylogo_one from './Assets/mylogo_one.png';
import home from './Assets/home.png';
import about_icon from './Assets/about_icon.png';
import contact_icon from './Assets/contact_icon.png';
import SongList from './components/SongList';
import { ToastNotificationContainer } from '../src/pages/toast';

// Navigation bar styles
const navStyle = css`
  display: flex;
  justify-content: center;
  background-color: #4E0467;
  border: 1px solid #4E0467;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1200px;
  height: 80px;
  z-index: 1000;
  padding: 15px 0;
  box-sizing: border-box;
  margin: 0 auto; /* Centering the navigation bar */

  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    
    padding-bottom: 10px;
    &:hover {
      color: #f0f0f0; /* Light color on hover */
    }
    &.active {
      border-bottom: 2px solid white; /* Highlight active link */
    }
    img {
      width: 30px;
      height: 30px;
    }
    p {
      margin: 5px 0 0;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 10px 0;
  }
`;

// Logo styles
const logocss = css`
  position: fixed;
  top: -14px;
  left: 20px;
  width: 180px;
  height: 102px;
  z-index: 1100;
  
  img {
    width: 100%;
    height: 100%;
  }
`;

// Main content styles
const mainStyle = css`
  padding-top: 120px;
`;

// Dropdown menu styles
const dropdownMenuStyle = css`
  position: absolute;
  top: 60px; /* Position below the nav link */
  background-color: #4E0467;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  padding: 10px;
  width: 150px;

  a {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &:hover {
      background-color: #5a2b8e;
    }
  }

  &.show {
    display: flex;
  }
`;

const NavLink = ({ to, children, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? 'active' : ''}>
      <img src={icon} alt={children} />
      <p>{children}</p>
    </Link>
  );
};

function App() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <Router>
      <div>
        <div css={logocss}>
          <img src={mylogo_one} alt="Logo" />
        </div>

        <nav css={navStyle}>
          <NavLink to="/" icon={home}>Home</NavLink>
          <NavLink to="/about" icon={about_icon}>About Us</NavLink>
          <NavLink to="/contact" icon={contact_icon}>Contact Us</NavLink>

          {/* Dropdown example */}
          <div css={dropdownMenuStyle} className={dropdownOpen ? 'show' : ''}>
            <Link to="/songs">Song List</Link>
            {/* Add more dropdown links here */}
          </div>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>Listen Music Bro</button>
        </nav>

        <main css={mainStyle}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/about"   element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/songs"   element={<SongList />} />
          </Routes>
        </main>
        <ToastNotificationContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
