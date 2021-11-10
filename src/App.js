import React from "react";
import { createGlobalStyle } from "styled-components";
import colours from "./common/colours/colours";
import StatefulButton from "./components/inputs/stateful_button";
import { SignupForm } from "./components/signup/signup-form";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colours.colour8};
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <SignupForm />
    </>
  );
}

export default App;
