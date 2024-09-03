/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const footerbox = css`
  background-color: #D9D9D9;
  padding: 40px;
  text-align: center;
`;

const footertext = css`
  color: #4E0467;
  margin: 0;
`;

const Footer = () => {
  return (
    <div css={footerbox}>
      <p css={footertext}>
        Copy@write. This page was last edited on 29 July 2024, at 03:08 (UTC).
      </p>
    </div>
  );
};

export default Footer;
