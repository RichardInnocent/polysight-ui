import { Meta, Story } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "./button";

export default {
  title: "Inputs/Button",
  component: Button,
} as Meta;

const StyledButton = styled(Button)`
  min-width: 200px;
`;

const Template: Story<ButtonProps> = (args: ButtonProps) => {
  const onAction = (): Promise<void> => {
    return new Promise<void>((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <StyledButton {...args} onAction={onAction}>
      {args.value}
    </StyledButton>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  value: "Button",
  primary: true,
  disabled: false,
  title: "",
  showSpinnerOnLoad: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: "Button",
  primary: false,
  disabled: false,
  title: "",
  showSpinnerOnLoad: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "Button",
  primary: false,
  disabled: true,
  title: "This has been disabled",
  showSpinnerOnLoad: true,
};
