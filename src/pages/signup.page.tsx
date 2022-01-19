import React, { useState } from "react";
import SignUpForm from "../components/features/signup/sign-up-form";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "../common/hosts/auth/auth";
import styled from "styled-components";
import colours from "../common/colours/colours";
import { NextPage } from "next";
import Router from "next/router";
import { routes } from "../common/hosts/hosts";

export interface SignUpPageProps {
  createUser: (user: CreateUserRequestDto) => Promise<CreateUserResponseDto>;
}

const ErrorMessage = styled.div`
  color: ${colours.errorColour};
`;

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SignUpPageFromProps: NextPage<SignUpPageProps> = ({
  createUser,
}: SignUpPageProps) => {
  const [createUserError, setCreateUserError] = useState("");

  return (
    <div>
      <p>This is the sign-up page</p>
      <SignUpFormContainer>
        <SignUpForm
          onSubmit={async (userDetails) => {
            try {
              await createUser(userDetails);
              await Router.push("/login");
            } catch (e) {
              setCreateUserError(
                "Failed to create user. Please try again later"
              );
            }
          }}
        />
        {createUserError && <ErrorMessage>{createUserError}</ErrorMessage>}
      </SignUpFormContainer>
    </div>
  );
};

export const SignUpPage: NextPage<SignUpPageProps> = () => {
  return SignUpPageFromProps({
    createUser: routes.authService.users.createUser,
  });
};

export default SignUpPage;
