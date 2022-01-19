import React from "react";
import { GetServerSideProps } from "next";

export interface TestPageProps {
  testText: string;
  testFunction: () => void;
}

export const TestPage = ({
  testText,
  testFunction,
}: TestPageProps): JSX.Element => {
  console.log(testFunction);
  return <button onClick={testFunction}>{testText}</button>;
};

export const getServerSideProps: GetServerSideProps<
  TestPageProps
> = async () => {
  console.log("Getting server side props...");
  return {
    props: {
      testText: "Hello, world!",
      testFunction: () => console.log("Button pressed!"),
    } as TestPageProps,
  };
};

export default TestPage;
