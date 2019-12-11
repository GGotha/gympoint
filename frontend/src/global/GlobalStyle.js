import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  html, body, #root {
    min-height: 100%
  }

  body {
    font-family: Roboto, Helvetica, sans-serif;
    background: #F5F5F5 !important;
  }
`;

export default GlobalStyle;
