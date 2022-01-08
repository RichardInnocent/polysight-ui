import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "./signup.page";
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from "../common/hosts/auth/auth";
import Router from "next/router";

jest.mock("next/router", () => ({ push: jest.fn() }));

describe("Sign up page", () => {
  describe("layout", () => {
    it("renders", () => {
      render(<SignUpPage createUser={jest.fn()} />);
    });

    it("renders a sign up component", () => {
      render(<SignUpPage createUser={jest.fn()} />);
      expect(screen.getByTestId("sign-up-form")).toBeInTheDocument();
    });
  });

  describe("signing up", () => {
    const createUserRequest = {
      email: "user@test.com",
      firstName: "John",
      lastName: "Smith",
      dateOfBirth: "2021-01-05",
      password: "test_password",
    } as CreateUserRequestDto;

    const createUserResponse = {
      email: createUserRequest.email,
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      dateOfBirth: createUserRequest.dateOfBirth,
      id: 1,
      accountStatus: "active",
    } as CreateUserResponseDto;

    it("redirects to the login page on success", async () => {
      const createUser = jest.fn(
        (userDetails: CreateUserRequestDto) => createUserResponse
      );

      render(
        <SignUpPage
          createUser={(userDetails) => {
            return new Promise<CreateUserResponseDto>((resolve) => {
              const user = createUser(userDetails);
              resolve(user);
            });
          }}
        />
      );
      setSignUpFormStateAndSubmit(createUserRequest);

      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );

      expect(createUser).toHaveBeenCalledWith(createUserRequest);
      expect(Router.push).toHaveBeenCalledWith("/login");
    });
  });
});

function getFirstNameField(): HTMLInputElement {
  return screen.getByPlaceholderText("First name") as HTMLInputElement;
}

function getLastNameField(): HTMLInputElement {
  return screen.getByPlaceholderText("Last name") as HTMLInputElement;
}

function getEmailField(): HTMLInputElement {
  return screen.getByPlaceholderText("Email address") as HTMLInputElement;
}

function getDateOfBirthField(): HTMLInputElement {
  return screen.getByLabelText("Date of birth") as HTMLInputElement;
}

function getPasswordField(): HTMLInputElement {
  return screen.getByPlaceholderText("Password") as HTMLInputElement;
}

function getConfirmPasswordField(): HTMLInputElement {
  return screen.getByPlaceholderText("Confirm password") as HTMLInputElement;
}

function getSubmitButton(): HTMLButtonElement {
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

function setSignUpFormState(user: CreateUserRequestDto): void {
  if (user.email) {
    setValue(getEmailField(), user.email);
  }

  if (user.firstName) {
    setValue(getFirstNameField(), user.firstName);
  }

  if (user.lastName) {
    setValue(getLastNameField(), user.lastName);
  }

  if (user.dateOfBirth) {
    setValue(getDateOfBirthField(), user.dateOfBirth);
  }

  if (user.password) {
    setValue(getPasswordField(), user.password);
    setValue(getConfirmPasswordField(), user.password);
  }
}

function setSignUpFormStateAndSubmit(user: CreateUserRequestDto): void {
  setSignUpFormState(user);
  fireEvent.click(getSubmitButton());
}
