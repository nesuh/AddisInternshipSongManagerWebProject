/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/about';
import ContactUs from './pages/contact';
import Footer from './pages/footer';
import mylogo_one from './Assets/mylogo_one.png';
import home from './Assets/home.png';
import about_icon from './Assets/about_icon.png';
import contact_icon from './Assets/contact_icon.png';
import SongList from './components/SongList';

// Navigation bar styles
const navStyle = css`
  display: flex;
  justify-content: center;
  background-color: #4E0467;
  border: 1px solid;
  border-color: #4E0467;
  position: fixed;
  top: 0;
  width: 75%;
  height: 80px; /* Adjusted height here */
  z-index: 1000;
  padding: 15px 0; /* Adjusted padding for better vertical alignment */
  box-sizing: border-box;
  margin-left: 10rem;

  a {
    color: white;
    text-decoration: none;
    margin: 0 20px; /* Increased margin for better spacing */
    display: flex;
    flex-direction: column;
    align-items: center;
    
    padding-bottom: 10px;
    &:hover {
      color: black;
    }
    img {
      width: 30px; /* Adjusted image size */
      height: 30px; /* Adjusted image size */
    }
    p {
      margin: 5px 0 0;
    }
  }
`;

// Logo styles
const logocss = css`
  position: fixed;
  top: -14px;
  left: -0px;
  width: 180px; /* Decreased width to maintain aspect ratio with height */
  height: 102px; /* Decreased height */
  z-index: 1100; /* Ensure logo is above other elements */
  
  img {
    width: 100%; /* Ensure image fits the container */
    height: 100%; /* Ensure image fits the container */
  }
`;

// Main content styles to ensure it is not hidden behind the fixed elements
const mainStyle = css`
  padding-top: 120px; /* Adjusted to avoid overlap with nav and logo */
`;

function App() {
  return (
    <Router>
      <div>
        <div css={logocss}>
          <img src={mylogo_one} alt="Logo" />
        </div>

        <nav css={navStyle}>
          <Link to="/">
            <img src={home} alt="Home" />
            <p>Home</p>
          </Link>

          <Link to="/about">
            <img src={about_icon} alt="About Us" />
            <p>About Us</p>
          </Link>

          <Link to="/contact">
            <img src={contact_icon} alt="Contact Us" />
            <p>Contact Us</p>
          </Link>
        </nav>

        <main css={mainStyle}>
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/about"   element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/songs"   element={<SongList />} />
          </Routes>
        </main>
        <SongList />
        <AboutUs />
        <ContactUs />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
