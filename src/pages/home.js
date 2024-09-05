/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Music_img1 from '../Assets/Music_img1.jpg'; // Ensure the path is correct
import mylogo_one from '../Assets/mylogo_one.png';
const homeStyle = css`
  scroll-behavior: smooth; /* Enable smooth scrolling */
  text-align: center;


  h1 {
    color: #4E0467;
  }
`;

const MusicBodyImage = css`
  width: 80%;
`;
const logocss = css`
 width:24%;
 margin-left:24rem;
`;

const Home = () => {
  return (
    <div css={homeStyle}>
       <div css={logocss}>
          <img src={mylogo_one} alt="Logo" />
        </div>
      <h1>WELLCOME TO NESUH SONG LIST</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        Nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        Nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        Nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
      </p>
      <div>
        <img src={Music_img1} alt="MusicBodyImage" css={MusicBodyImage} />
      </div>
    </div>
  );
};

export default Home;
