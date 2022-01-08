import { Meta, Story } from "@storybook/react";
import React from "react";
import Label from "./label";

export default {
  component: Label,
  title: "Display/Forms/Label",
} as Meta;

interface LabelStoryProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
}

const Template: Story<LabelStoryProps> = (props: LabelStoryProps) => {
  return <Label>{props.value}</Label>;
};

export const Default = Template.bind({});
Default.args = {
  value: "A label",
};
