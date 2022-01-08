import React, { useState } from "react";
import SignUpForm from "../components/features/signup/sign-up-form";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "../common/hosts/auth/auth";
import styled from "styled-components";
import colours from "../common/colours/colours";
import { GetServerSideProps, NextPage } from "next";
import Router from "next/router";
import { developmentConfig } from "../common/hosts/hosts";

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

export const SignUpPage: NextPage<SignUpPageProps> = ({
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
            } catch {
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

export const getServerSideProps: GetServerSideProps<
  SignUpPageProps
> = async () => {
  return {
    props: {
      createUser: (userDetails) =>
        developmentConfig.authService.users.createUser(userDetails),
    } as SignUpPageProps,
  };
};

export default SignUpPage;
