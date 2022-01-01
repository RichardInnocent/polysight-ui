import React, { ReactElement, useState } from "react";
import colours from "../../../common/colours/colours";
import Input from "../../inputs/input";
import styled from "styled-components";
import Button from "../../inputs/button";
import { LoginRequestDto } from "../../../common/hosts/auth/auth";

export interface LoginFormProps {
  onSubmit: (credentials: LoginRequestDto) => void;
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

function validateEmail(email: string): string {
  return email.length === 0
    ? "Please enter the email address that you signed up with"
    : "";
}

function validatePassword(password: string): string {
  return password.length === 0 ? "Please enter your password" : "";
}

export const LoginForm = ({ onSubmit }: LoginFormProps): ReactElement => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const wrappedOnSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const currentEmailError = validateEmail(email);
    const currentPasswordError = validatePassword(password);
    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);
    if (currentEmailError.length > 1 || currentPasswordError.length > 1) {
      return;
    }

    const credentials = {
      email: email,
      password: password,
    } as LoginRequestDto;

    onSubmit(credentials);
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
          onClick={wrappedOnSubmit}
          disabled={emailError.length > 0 || passwordError.length > 0}
        >
          Log in
        </Button>
      </FormFieldDiv>
    </StyledSignUpForm>
  );
};

export default LoginForm;
