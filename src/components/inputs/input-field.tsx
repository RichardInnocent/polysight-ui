import styled from "styled-components";
import colours from "../../common/colours/colours";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorState?: boolean;
}

export const Input = styled.input<InputProps>`
  background: ${colours.colour7};
  color: ${colours.colour1};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.errorState ? colours.errorColour : colours.colour7)};

  ::placeholder {
    color: ${colours.colour3};
  }
`;

export default Input;
