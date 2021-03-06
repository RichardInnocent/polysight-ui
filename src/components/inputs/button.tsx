import React, { useState } from "react";
import styled from "styled-components";
import Spinner from "../icons/spinner";
import colours from "../../common/colours/colours";

export interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export interface ButtonProps extends StyledButtonProps {
  onAction?: () => Promise<void>;
  showSpinnerOnLoad?: boolean;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { onAction, ...styledButtonProps } = props;

  // Wrap the onClick to ensure that the loading state is set accordingly
  const action = (e: React.MouseEvent) => {
    e.preventDefault();
    // If the button is already in a loading state, don't re-action the event
    if (onAction && !loading) {
      setLoading(true);
      onAction()
        .catch(() => {
          return;
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <StyledButton {...styledButtonProps} onClick={action}>
      {props.children}
      {props.showSpinnerOnLoad && loading && (
        <StyledSpinner fontSize="1em" stroke={getFontColour(props)} />
      )}
    </StyledButton>
  );
};

export default Button;

function getBackgroundColour(props: ButtonProps, hovering: boolean): string {
  if (props.disabled) {
    return colours.colour5;
  }
  if (props.primary) {
    return hovering ? colours.accentColour2 : colours.accentColour1;
  }
  return hovering ? colours.colour5 : colours.colour6;
}

function getFontColour(props: ButtonProps): string {
  if (props.disabled) {
    return colours.colour3;
  }
  if (props.primary) {
    return colours.colour8;
  }
  return colours.colour1;
}

interface SpinnerProps {
  fontSize: string;
}

const StyledSpinner = styled(Spinner)<SpinnerProps>`
  float: right;
  height: ${(props) => props.fontSize};
`;

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => getBackgroundColour(props, false)};
  color: ${(props) => getFontColour(props)};
  padding: 10px;
  border-radius: 10px;
  border: none;
  transition: background-color 0.5s ease;
  font-size: 1.5em;

  :hover {
    background-color: ${(props) => getBackgroundColour(props, true)};
  }
`;
