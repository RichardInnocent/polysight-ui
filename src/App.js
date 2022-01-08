import React from "react";
import GlobalStyle from "./common/styling/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index.page";
import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/signup.page";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
