import "../styles.css";

import { AppProps } from "next/app";

export function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <Component {...pageProps} />;
}

export default MyApp;
