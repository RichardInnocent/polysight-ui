import React from "react";
import * as SVGLoaders from "svg-loaders-react";

export const Spinner = (
  props: React.ImgHTMLAttributes<HTMLImageElement>
): JSX.Element => {
  return <SVGLoaders.Oval {...props} />;
};

export default Spinner;
