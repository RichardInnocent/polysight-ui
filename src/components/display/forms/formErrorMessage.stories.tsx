import { Meta, Story } from "@storybook/react";
import React from "react";
import FormErrorMessage from "./formErrorMessage";

export default {
  title: "Display/Forms/FormErrorMessage",
  component: FormErrorMessage,
} as Meta;

interface FormErrorMessageStoryProps {
  text: string;
}

const Template: Story<FormErrorMessageStoryProps> = ({
  text,
}: FormErrorMessageStoryProps) => {
  return <FormErrorMessage>{text}</FormErrorMessage>;
};

export const Default = Template.bind({});
Default.args = {
  text: "Please enter a valid value",
} as FormErrorMessageStoryProps;
