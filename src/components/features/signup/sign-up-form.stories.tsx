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

const Template: ComponentStory<typeof SignUpForm> = (args: SignUpFormProps) => {
  const axiosMock = (apiMock: MockAdapter) => {
    apiMock.onPost(developmentConfig.polysightAuth.usersRoute()).reply(200);
  };
  return (
    <AxiosMock mock={axiosMock}>
      <SignUpForm {...args} hosts={developmentConfig} />
    </AxiosMock>
  );
};

export const Default = Template.bind({});
Default.args = {
  onSuccess: (userDetails: UserDetails) => {
    console.log(userDetails);
  },
};
