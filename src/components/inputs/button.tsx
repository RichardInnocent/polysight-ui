import React from "react";
import colours from "../../common/colours/colours";
import styled from "styled-components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.disabled
      ? colours.colour5
      : props.primary
      ? colours.accentColour1
      : colours.colour6};
  font-color: ${(props) =>
    props.disabled ? colours.colour3 : colours.colour2};
  padding: 10px;
  border-radius: 10px;
  border: none;

  :hover {
    background-color: ${(props) =>
      props.disabled
        ? colours.colour5
        : props.primary
        ? colours.accentColour2
        : colours.colour5};
    font-color: ${(props) =>
      props.disabled ? colours.colour3 : colours.colour1};
  }
`;

export default Button;
