import React from "react";
import SignUpForm from "../components/signup/sign-up-form";
import HostConfig from "../common/hosts/hosts";

export interface SignUpPageProps {
  hosts: HostConfig;
}

export const SignUpPage = (props: SignUpPageProps): JSX.Element => {
  return (
    <div>
      <p>This is the sign-up page</p>
      <SignUpForm {...props} />
    </div>
  );
};

export default SignUpPage;
