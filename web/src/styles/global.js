import styled, { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  header {
    font-weight: bold;
    font-size: 22px;
    color: #333;
  }
`;

export const Content = styled.div`
  margin: 50px 150px auto;
  display: flex;
  flex-direction: column;

  header {
    margin-bottom: 20px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
