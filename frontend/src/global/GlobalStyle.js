import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none !important;
  }
  html, body, #root {
    min-height: 100%
  }

  body {
    font-family: Roboto, Helvetica, sans-serif;
    background: #F5F5F5 !important;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
