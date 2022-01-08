import styled from "styled-components";
import colours from "../../common/colours/colours";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorState?: boolean;
}

export const Input = styled.input<InputProps>`
  background: ${colours.colour7};
  color: ${colours.colour1};
  font-size: 1em;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: ${(props) =>
    props.errorState ? "1px solid " + colours.errorColour : "none"}};

  ::placeholder {
    color: ${colours.colour3};
  }

  :focus-visible {
    outline: solid 1px ${colours.colour1};
  }
`;

export default Input;
