/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const aboutUsStyle = css`
  color: #4E0467;
  margin: 100px auto;
  padding: 50px;
  max-width: 800px; /*nesuh@- Restrict width for better readability */
  background-color: #f9f9f9; /* nesuh@- Light background for contrast */
  border-radius: 10px; /*nesuh@-  Rounded corners for a modern look */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /*nesuh@-  Subtle shadow for depth */

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2rem;
    margin: 20px 0;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 10px 0;
    color: #333; /* Dark text color for readability */
  }
`;

const AboutUs = () => {
  return (
    <div css={aboutUsStyle}>
      <h1>About Us</h1>
      <h2>Our Mission</h2>
      <p>
        At Music Management Application, we aim to simplify the way you manage and enjoy your music.
        Our mission is to provide a user-friendly platform that leverages the latest technology to
        enhance your musical experience.
      </p>
      <p>
        Our platform is built with a powerful tech stack to ensure high performance and reliability:
      </p>
      <ul>
        <li><strong>Frontend:</strong> Utilizing React for dynamic and responsive UI, coupled with Redux Toolkit and Redux-Saga for efficient state management.</li>
        <li><strong>Backend:</strong> Powered by NestJS, offering a robust and scalable server-side architecture.</li>
        <li><strong>Database:</strong> Leveraging PostgreSQL for secure and efficient data storage and retrieval.</li>
        <li><strong>File Handling:</strong> Integrated file upload capabilities for both audio and image files, ensuring smooth media management.</li>
      </ul>
      <h2>Technology Stack</h2>
      <p>
        Our user interface is designed with care, guided by a comprehensive design file created in Figma. 
        This design ensures that our application is not only functional but also visually appealing
        and easy to navigate.
      </p>
    </div>
  );
};

export default AboutUs;
