import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import { developmentConfig } from "../../../common/hosts/hosts";
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
  hosts: developmentConfig,
} as LoginFormProps;
