/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const globalStyles = css`
 body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

h1 {
  text-align: center;
  margin: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

li img {
  margin-right: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

audio {
  display: none;
}


`;
