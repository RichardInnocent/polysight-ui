import React from "react";
import Input, { InputProps } from "./input";
import { Story, Meta } from "@storybook/react";

export default {
  component: Input,
  title: "Inputs/Input",
} as Meta;

const Template: Story<InputProps> = (args: InputProps) => {
  return <Input {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  errorState: false,
  placeholder: "Enter some text",
};

export const Error = Template.bind({});
Error.args = {
  errorState: true,
  placeholder: "",
};
