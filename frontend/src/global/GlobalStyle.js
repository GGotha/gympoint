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

  #input-select {
    /* height: 50px; */
    /* width: 100%; */

    div {
      /* width: 100%; */
      /* height: 45px; */
      /* padding: 5px 0px 0px 5px; */

      div {
        /* border: 1px solid; */

      }
    }
  }
`;

export default GlobalStyle;
