import React from "react";
import SignUpForm from "../components/features/signup/sign-up-form";
import { UsersApi } from "../common/hosts/auth/auth";

export interface SignUpPageProps {
  users: UsersApi;
}

export const SignUpPage = ({ users }: SignUpPageProps): JSX.Element => {
  return (
    <div>
      <p>This is the sign-up page</p>
      <SignUpForm
        onSubmit={(userDetails) => {
          // TODO redirect and error
          users
            .createUser(userDetails)
            .catch(() => console.log("Failed to create user"));
        }}
      />
    </div>
  );
};

export default SignUpPage;
