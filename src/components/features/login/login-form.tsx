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

interface FormState {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  submitError: string;
}

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
  const [formState, setFormState] = useState<FormState>({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    submitError: "",
  });

  const [, setCookie] = useCookies([authCookieName]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((fs) => {
      fs.email = e.target.value;
      fs.emailError = validateEmail(fs.email);
      return fs;
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((fs) => {
      fs.password = e.target.value;
      fs.passwordError = validatePassword(fs.password);
      return fs;
    });
  };

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const payload = {
      email: formState.email,
      password: formState.password,
    } as LoginRequestBody;

    axios
      .post<LoginResponse>(hosts.polysightAuth.authenticateRoute(), payload)
      .then((response) => {
        setCookie(authCookieName, response.data.access_token, {
          expires: new Date(Date.now() + response.data.expires_in),
        } as CookieSetOptions);
      })
      .catch(() => {
        setFormState((fs) => {
          fs.submitError = "Something went wrong";
          return fs;
        });
      });
  };

  console.log(formState.emailError);
  console.log(formState.passwordError);

  return (
    <StyledSignUpForm>
      <LoginHeading>Log in</LoginHeading>
      <FormFieldDiv>
        <Input
          placeholder="Email address"
          onChange={handleEmailChange}
          errorState={formState.emailError.length > 0}
        />
        <ErrorMessage>{formState.emailError}</ErrorMessage>
      </FormFieldDiv>
      <FormFieldDiv>
        <Input
          placeholder="Password"
          type="password"
          onChange={handlePasswordChange}
          errorState={formState.passwordError.length > 0}
        />
        <ErrorMessage>{formState.passwordError}</ErrorMessage>
      </FormFieldDiv>
      <FormFieldDiv>
        <Button
          primary
          onClick={onSubmit}
          disabled={
            formState.emailError.length > 0 ||
            formState.passwordError.length > 0
          }
        >
          Log in
        </Button>
        <ErrorMessage>{formState.submitError}</ErrorMessage>
      </FormFieldDiv>
    </StyledSignUpForm>
  );
};

export default LoginForm;
