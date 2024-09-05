/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Music_img1 from '../Assets/Music_img1.jpg'; // Ensure the path is correct
import mylogo_one from '../Assets/mylogo_one.png';

const homeStyle = css`
  scroll-behavior: smooth; /* Enable smooth scrolling */
  text-align: center;
  padding: 20px;
  background-color: #f4f4f4; /* Light background for contrast */
  color: #333; /* Dark text color for readability */
  
  h1 {
    color: #4E0467; /* Vibrant purple for headers */
    font-size: 2.5rem; /* Larger header for prominence */
    margin-bottom: 20px;
  }
  
  h2 {
    color: #4E0467;
    font-size: 2rem; /* Slightly smaller than h1 */
    margin: 20px 0;
  }
  
  p {
    font-size: 1.2rem; /* Slightly larger font for readability */
    line-height: 1.6; /* Increased line height for better readability */
    margin: 10px 0;
  }
`;

const MusicBodyImage = css`
  width: 80%;
  margin: 20px auto; /* Center the image and add margin */
  border-radius: 10px; /* Rounded corners for a modern look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
`;

const logocss = css`
  width: 20%;
  margin: 0 auto 30px; /* Center the logo and add margin below */
  display: block;
`;

const Home = () => {
  return (
    <div css={homeStyle}>
      <div css={logocss}>
        <img src={mylogo_one} alt="Logo" />
      </div>
      <h1>Welcome to the NESUH Music Management Application! 🎶</h1>
      <p>
        Our application is a comprehensive solution for managing and enjoying your music collection. Whether you're a music
        enthusiast or a professional, our platform offers a seamless experience for handling your songs and albums with ease.
        Built with modern technologies, our full-stack application leverages the power of NestJS for the backend and React with
        Redux Toolkit for the frontend.
      </p>
      <h2>Explore our features to:</h2>
      <p>
        <strong>Upload and Manage Songs:</strong> Easily add new songs and manage your existing ones.<br />
        <strong>Enjoy a User-Friendly Interface:</strong> Navigate through a sleek and intuitive design, crafted with the latest frontend technologies.<br />
        <strong>Access a Robust Backend:</strong> Experience reliable and scalable backend operations powered by NestJS and TypeORM.
      </p>
      <p>
        Dive in and start managing your music today!
      </p>
      <div>
        <img src={Music_img1} alt="MusicBodyImage" css={MusicBodyImage} />
      </div>
    </div>
  );
};

export default Home;
