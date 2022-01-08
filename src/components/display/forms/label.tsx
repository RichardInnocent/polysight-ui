import React from "react";
import styled from "styled-components";
import colours from "../../../common/colours/colours";

export const Label = styled.label<React.LabelHTMLAttributes<HTMLLabelElement>>`
  color: ${colours.colour1};
  font-size: 1em;
  margin-bottom: 5px;
`;

export default Label;
