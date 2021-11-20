import React from "react";
import Button, { ButtonProps } from "./button";
import { Story, Meta } from "@storybook/react";

export default {
  component: Button,
  title: "Inputs/Button",
} as Meta;

interface ButtonStoryProps extends ButtonProps {
  value: string;
}

const Template: Story<ButtonStoryProps> = (args: ButtonStoryProps) => {
  return <Button {...args}>value</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  value: "Button",
  primary: true,
  disabled: false,
  title: "",
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: "Button",
  primary: false,
  disabled: false,
  title: "",
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "Button",
  primary: false,
  disabled: true,
  title: "This has been disabled",
};
