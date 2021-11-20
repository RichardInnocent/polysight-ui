import React from "react";
import colours from "../../common/colours/colours";
import styled from "styled-components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary: boolean;
}

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

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => getBackgroundColour(props, false)};
  color: ${(props) => getFontColour(props)};
  padding: 10px;
  border-radius: 10px;
  border: none;

  :hover {
    background-color: ${(props) => getBackgroundColour(props, true)};
  }
`;

export default Button;
