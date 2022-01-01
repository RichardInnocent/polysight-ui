import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SignUpForm, { SignUpFormProps, UserDetails } from "./sign-up-form";
import MockAdapter from "axios-mock-adapter/types";
import AxiosMock from "../../../common/hosts/storybookAxiosMock";
import { developmentConfig } from "../../../common/hosts/hosts";

export default {
  title: "Features/Sign Up",
  component: SignUpForm,
} as Meta;

const Template: ComponentStory<typeof SignUpForm> = (
  props: SignUpFormProps
) => {
  return <SignUpForm {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: (userDetails) => console.log("Creating user...", userDetails),
};
