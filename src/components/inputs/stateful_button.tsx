import React from "react";
import styled from "styled-components";
import Spinner from "../icons/spinner";
import Button, { ButtonProps } from "./button";

export interface StatefulButtonProps extends ButtonProps {
  text: string;
  loadingText?: string;
  loading: boolean;
  fontSize: string;
}

interface SpinnerProps {
  fontSize: string;
}

const StyledSpinner = styled(Spinner)<SpinnerProps>`
  float: right;
  height: ${(props) => props.fontSize};
`;

export const StatefulButton = (props: StatefulButtonProps): JSX.Element => {
  return (
    <Button {...props}>
      <div>
        {props.loading ? <StyledSpinner fontSize={props.fontSize} /> : null}
        {props.loading && props.loadingText ? props.loadingText : props.text}
      </div>
    </Button>
  );
};

export default StatefulButton;
