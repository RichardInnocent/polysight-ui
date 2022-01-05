import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SignUpForm, { SignUpFormProps } from "./sign-up-form";

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
