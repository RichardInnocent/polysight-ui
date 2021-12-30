import { useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Solution for mocking axios calls in Storybook from
// https://gist.github.com/rafaelrozon/ed86efbea53094726e162dc05882cddc

export interface AxiosMockProps {
  children: JSX.Element;
  mock: (adapter: MockAdapter) => void;
}

const apiMock = new MockAdapter(axios);

export const AxiosMock = ({ children, mock }: AxiosMockProps): JSX.Element => {
  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });
  return children;
};

export default AxiosMock;