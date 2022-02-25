import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import LoginForm, { LoginFormProps } from "./login-form";

export default {
  title: "Features/Login",
  component: LoginForm,
} as Meta;

const Template: ComponentStory<typeof LoginForm> = (props: LoginFormProps) => {
  return <LoginForm {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: (credentials): Promise<void> => {
    console.log("Signing in user", credentials);
    return new Promise((resolve) => setTimeout(resolve, 2_000));
  },
} as LoginFormProps;
