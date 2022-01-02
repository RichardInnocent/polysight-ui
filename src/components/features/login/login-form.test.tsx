import React from "react";
import { LoginForm, LoginFormProps } from "./login-form";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { LoginRequestDto } from "../../../common/hosts/auth/auth";

describe("Login form", () => {
  const loginAction = Promise.resolve();
  const props = {
    onSubmit: jest.fn(() => loginAction),
  } as LoginFormProps;
  it("renders", () => {
    render(<LoginForm {...props} />);
  });

  it("submits the username and password when login clicked", async () => {
    const credentials = {
      email: "user@test.com",
      password: "test_password",
    };
    render(<LoginForm {...props} />);
    setInputs(credentials);

    fireEvent.click(getLoginButton());
    await act(() => loginAction);

    expect(props.onSubmit).toHaveBeenCalledWith(credentials);
  });

  // TODO validation tests
});

function setInputs(credentials: LoginRequestDto) {
  setValue(getEmailField(), credentials.email);
  setValue(getPasswordField(), credentials.password);
}

function getEmailField(): HTMLInputElement {
  return screen.getByPlaceholderText("Email address") as HTMLInputElement;
}

function getPasswordField(): HTMLInputElement {
  return screen.getByPlaceholderText("Password") as HTMLInputElement;
}

function getLoginButton(): HTMLButtonElement {
  return screen.getByRole("button") as HTMLButtonElement;
}

function setValue(field: HTMLInputElement, newValue: string) {
  fireEvent.focus(field);
  fireEvent.change(field, {
    target: {
      value: newValue,
    },
  });
  fireEvent.blur(field);
}
