/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import instagram from '../Assets/instagram.png';
import linkedin from '../Assets/linkedin.png';
import telegram from '../Assets/telegram.png';
import facebook from '../Assets/facebook_logo.png';

const contactUsStyle = css`
  color: #4E0467;
  margin: 100px 50px 0 50px;
  padding: 20px;
  border: 2px solid #4E0467;
  border-radius: 8px;
  max-width: 1200px; /* Ensures the section does not stretch too wide */
  background-color: #f9f9f9; /* Light background for contrast */
`;

const contactUsBox = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const contactUsText = css`
  flex: 1;
  padding: 20px;
  border-right: 2px solid #4E0467;
  
  p {
    margin: 15px 0;
    line-height: 1.6;
    color: #333; /* Darker text color for readability */
  }
  
  h2 {
    margin-top: 20px;
    color: #4E0467;
  }
`;

const contactUsLinks = css`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    margin: 10px;
    display: inline-block;
  }

  img {
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const ContactUs = () => {
  return (
    <div css={contactUsStyle}>
      <h1>Contact Us</h1>
      <div css={contactUsBox}>
        <div css={contactUsText}>
          <p>We’d love to hear from you! If you have any questions, feedback, or need support, please feel free to reach out to us.</p>
          <h2>How to Contact Us</h2>
          <p>Email: You can contact us via email at <a href="mailto:nesuhmom@gmail.com">nesuhmom@gmail.com</a>. We’re here to assist you with any inquiries or issues you may have.</p>
          <p>Phone: For immediate assistance, call us at <a href="tel:+251960948969">+251960948969</a>. Our support team is available Monday through Friday, 9 AM to 5 PM.</p>
          <p>Mailing Address: Send us mail at <a href="mailto:antenhesileshi@gmail.com">antenhesileshi@gmail.com</a>.</p>
          <p>Your feedback and suggestions are valuable to us, and we look forward to hearing from you!</p>
        </div>
        <div css={contactUsLinks}>
          <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href='https://www.telegram.org' target="_blank" rel="noopener noreferrer">
            <img src={telegram} alt="Telegram" />
          </a>
          <a href='https://www.instagram.com' target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href='https://www.linkedin.com' target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
