import { AxiosResponse } from "axios";

export const throwIfNot2xx = (response: AxiosResponse): void => {
  if (response.status < 200 || response.status >= 300) {
    const responseBody = convertBodyToString(response);
    throw new Error(
      `Non-2xx status code returned. Status: ${response.status}${
        responseBody.length > 1 ? ". Response: " + responseBody : ""
      }`
    );
  }
};

const convertBodyToString = (response: AxiosResponse): string => {
  const body = response.data;
  if (typeof body === "string") {
    return String(response.data);
  } else {
    return JSON.stringify(body);
  }
};
