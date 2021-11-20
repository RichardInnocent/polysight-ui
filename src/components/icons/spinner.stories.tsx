import React from "react";
import Spinner, { SpinnerProps } from "./spinner";
import { ComponentStory, Meta } from "@storybook/react";

export default {
  component: Spinner,
  title: "Components/Icons/Spinner",
} as Meta;

const Template: ComponentStory<typeof Spinner> = (args: SpinnerProps) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  stroke: "#2b2b2b",
};
