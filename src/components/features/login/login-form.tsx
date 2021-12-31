import React, { ReactElement, useState } from "react";
import colours from "../../../common/colours/colours";
import HostConfig from "../../../common/hosts/hosts";
import Input from "../../inputs/input";
import styled from "styled-components";
import Button from "../../inputs/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

export interface LoginFormProps {
  hosts: HostConfig;
}

const LoginHeading = styled.h1`
  color: ${colours.colour1};
  text-align: center;
`;

const StyledSignUpForm = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  grid-gap: 10px;
`;

const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: ${colours.errorColour};
`;

const authCookieName = "polysight-auth";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

function validateEmail(email: string): string {
  return email.length === 0
    ? "Please enter the email address that you signed up with"
    : "";
}

function validatePassword(password: string): string {
  return password.length === 0 ? "Please enter your password" : "";
}

export const LoginForm = ({ hosts }: LoginFormProps): ReactElement => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [, setCookie] = useCookies([authCookieName]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value))
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const currentEmailError = validateEmail(email);
    const currentPasswordError = validatePassword(password);
    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);
    if (currentEmailError.length > 1 || currentPasswordError.length > 1) {
      return;
    }

    const payload = {
      email: email,
      password: password,
    } as LoginRequestBody;

    console.log(hosts.polysightAuth.authenticateRoute())

    axios
      .post<LoginResponse>(hosts.polysightAuth.authenticateRoute(), payload)
      .then((response) => {
        setCookie(authCookieName, response.data.access_token, {
          expires: new Date(Date.now() + response.data.expires_in),
        } as CookieSetOptions);
      })
      .catch(() => {
        setSubmitError("Something went wrong.")
      });
  };

  return (
    <StyledSignUpForm>
      <LoginHeading>Log in</LoginHeading>
      <FormFieldDiv>
        <Input
          placeholder="Email address"
          onChange={handleEmailChange}
          errorState={emailError.length > 0}
        />
        <ErrorMessage>{emailError}</ErrorMessage>
      </FormFieldDiv>
      <FormFieldDiv>
        <Input
          placeholder="Password"
          type="password"
          onChange={handlePasswordChange}
          errorState={passwordError.length > 0}
        />
        <ErrorMessage>{passwordError}</ErrorMessage>
      </FormFieldDiv>
      <FormFieldDiv>
        <Button
          primary
          onClick={onSubmit}
          disabled={
            emailError.length > 0 ||
            passwordError.length > 0
          }
        >
          Log in
        </Button>
        <ErrorMessage>{submitError}</ErrorMessage>
      </FormFieldDiv>
    </StyledSignUpForm>
  );
};

export default LoginForm;
