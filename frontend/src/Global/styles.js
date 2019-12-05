import { createGlobalStyle } from "styled-components";
import "font-awesome/css/font-awesome.css";

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
    font-family: Arial, Helvetica, sans-serif;
    background-image: linear-gradient(to bottom, #22202c, #402845);
  }
`;

export default GlobalStyle;
