import React from "react";
import * as SVGLoaders from "svg-loaders-react";

export interface SpinnerProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The colour of the stroke.
   */
  stroke?: string;

  /**
   * The opacity of the stroke.
   */
  strokeOpacity?: string;
}

export const Spinner = (props: SpinnerProps): JSX.Element => {
  return <SVGLoaders.Oval {...props} />;
};

export default Spinner;
