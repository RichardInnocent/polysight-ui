import React from "react";
import { LoginForm, LoginFormProps } from "./login-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginRequestDto } from "../../../common/hosts/auth/auth";

describe("Login form", () => {
  const onSubmitMock = jest.fn();
  const props = {
    onSubmit: (credentials) =>
      new Promise<void>((resolve) => {
        onSubmitMock(credentials);
        resolve();
      }),
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
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(onSubmitMock).toHaveBeenCalledWith(credentials);
  });

  describe("validation", () => {
    const emailError = "Please enter the email address that you signed up with";
    const passwordError = "Please enter your password";

    it("displays no errors when first loaded", () => {
      render(<LoginForm {...props} />);
      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordError)).not.toBeInTheDocument();
    });

    it("displays an error if the email is empty", () => {
      render(<LoginForm {...props} />);
      setInputs({
        email: "email",
        password: "password",
      });

      setInputs({
        email: "",
        password: "password",
      });

      expect(screen.queryByText(emailError)).toBeInTheDocument();
      expect(screen.queryByText(passwordError)).not.toBeInTheDocument();
      expect(getLoginButton()).toBeDisabled();
    });

    it("displays an error if the password is empty", () => {
      render(<LoginForm {...props} />);
      setInputs({
        email: "email",
        password: "password",
      });

      setInputs({
        email: "email",
        password: "",
      });

      expect(screen.queryByText(emailError)).not.toBeInTheDocument();
      expect(screen.queryByText(passwordError)).toBeInTheDocument();
      expect(getLoginButton()).toBeDisabled();
    });
  });
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
