/** @jsxImportSource @emotion/react */

import React from 'react'
import { css } from '@emotion/react';
import instagram from '../Assets/instagram.png'
import linkedin from '../Assets/linkedin.png'
import telegram from '../Assets/telegram.png'
import facebook from '../Assets/facebook_logo.png'


const contactUsStyle = css`
color:#4E0467;
margin-left: 100px;
margin-top: 150px;
width:20px

 border:2px solid;
  border-color:#4E0467; 
`;
const ContatcUsBox=css`
  display:flex;
`
const ContactUsText=css`
  border-right:2px solid;
  border-color:#4E0467; 
  padding:10rem 0rem;
  width:50%;

 p{
 padding:2px;
 margin-left: 20px;
 }
`
const ContactUsLink=css`
  width:30%;
 padding-top:20%;
 margin-left:100px
 
`
const ContactUs = () => {
  return (
    <div >
      <h1 css={contactUsStyle}>Contact Us</h1>
      <div css={ContatcUsBox}>
      <div  css={ContactUsText}>
     <p>
reprehenderit in voluptate velit essecillum dolore.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris.
Nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
 </p>
 <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim , quis nostrud exercitation ullamco laboris.
Nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit essecillu
m dolore.</p>
 <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris.
 Nisi ut aliquip ex ea commodo consequat.
 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
</p>
      <p>Feel free to reach out to us at contact@musicapp.com</p>
      </div>
      <div css={ContactUsLink}>
      <a href='https://www.facebook.com'>
  <img src={facebook} alt="Facebook" />
</a>
<a href='https://www.telegram.org'>
  <img src={telegram} alt="Telegram" />
</a>
<a href='https://www.instagram.com'>
  <img src={instagram} alt="Instagram" />
</a>
<a href='https://www.linkedin.com'>
  <img src={linkedin} alt="LinkedIn" />
</a>





      </div>
      </div>
    </div>
  );
};

export default ContactUs;
