import { createGlobalStyle } from "styled-components";
import colours from "../colours/colours";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Open Sans";
    src: url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap");
  }

  .sb-show-main {
    font-family: 'Open Sans', sans-serif;
    background: ${colours.colour8};
    color: ${colours.colour1};
  }
`;

export default GlobalStyle;
