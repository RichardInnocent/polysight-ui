import { createGlobalStyle } from "styled-components";
import colours from "../colours/colours";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Nunito";
    src: font-url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,400;1,200;1,400&display=swap");
  }

  .sb-show-main {
    font-family: "Nunito", sans-serif;
    background: ${colours.colour8};
    color: ${colours.colour1};
  }
`;

export default GlobalStyle;
