import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import SignUpForm, { SignUpFormProps, UserDetails } from "./sign-up-form";

export default {
  title: "Features/Sign Up",
  component: SignUpForm,
} as Meta;

const Template: ComponentStory<typeof SignUpForm> = (args: SignUpFormProps) => {
  return <SignUpForm {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onSuccess: (userDetails: UserDetails) => {
    console.log(userDetails);
  },
};
