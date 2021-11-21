import React from "react";
import { createGlobalStyle } from "styled-components";
import colours from "./common/colours/colours";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colours.colour8};
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
