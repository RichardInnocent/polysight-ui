import React from "react";
import SignUpForm from "./sign-up-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import { CreateUserRequestDto } from "../../../common/hosts/auth/auth";

const limits = {
  firstNameMaxLength: 32,
  lastNameMaxLength: 32,
  emailAddressMaxLength: 128,
  passwordMinLength: 8,
};

interface FormState {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
}

describe("Sign up form", () => {
  it("renders successfully", () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
  });

  describe("Validation", () => {
    describe("First name", () => {
      it("displays a warning and disables the sign up button if the first name is not entered", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const firstNameInputField = getFirstNameField();
        fireEvent.focus(firstNameInputField);
        fireEvent.blur(firstNameInputField);

        expect(
          screen.getByText("Please provide your first name")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the first name is ${
        limits.firstNameMaxLength + 1
      } long`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(
          getFirstNameField(),
          "a".repeat(limits.firstNameMaxLength + 1)
        );

        expect(
          screen.getByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it("accepts the input if the first name is one character long", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getFirstNameField(), "a");

        expect(
          screen.queryByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton()).not.toBeDisabled();
      });

      it(`accepts the input if the first name is ${limits.firstNameMaxLength} characters long`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getFirstNameField(), "a".repeat(limits.firstNameMaxLength));

        expect(
          screen.queryByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton()).not.toBeDisabled();
      });
    });

    describe("Last name", () => {
      it("displays a warning and disables the sign up button if the last name is not entered", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const lastNameInputField = getLastNameField();
        fireEvent.focus(lastNameInputField);
        fireEvent.blur(lastNameInputField);

        expect(
          screen.getByText("Please provide your last name")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the last name is ${
        limits.lastNameMaxLength + 1
      } long`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getLastNameField(), "a".repeat(limits.lastNameMaxLength + 1));

        expect(
          screen.getByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it("accepts the input if the last name is one character long", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getLastNameField(), "a");

        expect(
          screen.queryByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton()).not.toBeDisabled();
      });

      it(`accepts the input if the last name is ${limits.lastNameMaxLength} characters long`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getLastNameField(), "a".repeat(limits.lastNameMaxLength));

        expect(
          screen.queryByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton()).not.toBeDisabled();
      });
    });

    describe("Email address", () => {
      it("displays a warning and disables the sign up button if the email address is not entered", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const emailInputField = getEmailAddressField();
        fireEvent.focus(emailInputField);
        fireEvent.blur(emailInputField);

        expect(
          screen.getByText("Please provide your email address")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the email address is ${
        limits.emailAddressMaxLength + 1
      } long`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(
          getEmailAddressField(),
          "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 4)
        );

        expect(
          screen.getByText(
            `Must be ${limits.emailAddressMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the email address invalid`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getEmailAddressField(), "invalid email address");

        expect(
          screen.getByText("Email address is invalid")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it("accepts the input if the email is five characters long and valid", () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getEmailAddressField(), "a@b.c");

        expect(getSubmitButton()).not.toBeDisabled();
      });

      it(`accepts the input if the email is ${limits.emailAddressMaxLength} characters long and valid`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(
          getEmailAddressField(),
          "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 5)
        );

        expect(getSubmitButton()).not.toBeDisabled();
      });
    });

    describe("Date of birth", () => {
      it(`displays a warning and disables the sign up button if the date of birth field is invalid`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const dateOfBirthField = getDateOfBirthField();
        fireEvent.focus(dateOfBirthField);
        fireEvent.blur(dateOfBirthField);

        expect(
          screen.getByText("Please provide your date of birth")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the date of birth is in the future`, () => {
        const renderResult = render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(
          getDateOfBirthField(),
          dayjs().add(1, "day").format("YYYY-MM-DD")
        );

        expect(
          renderResult.getByText(
            "Date of birth can't be in the future... right?... Is that you Marty?"
          )
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });
    });

    describe("Password", () => {
      it(`displays a warning and disables the sign up button if the password is not set`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const passwordField = getPasswordField();
        fireEvent.focus(passwordField);
        fireEvent.blur(passwordField);

        expect(
          screen.getByText("Please provide a password to protect your account")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the password is less than ${limits.passwordMinLength} characters`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        setValue(getPasswordField(), "a".repeat(limits.passwordMinLength - 1));

        expect(
          screen.getByText(
            `The password must be at least ${limits.passwordMinLength} characters long`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });
    });

    describe("Confirm password", () => {
      it(`displays a warning and disables the sign up button if the confirm password field is not filled`, () => {
        render(<SignUpForm onSubmit={jest.fn()} />);

        const confirmPasswordField = getConfirmPasswordField();
        fireEvent.focus(confirmPasswordField);
        fireEvent.blur(confirmPasswordField);

        expect(
          screen.getByText("Please re-enter your password")
        ).toBeInTheDocument();
        expect(getSubmitButton()).toBeDisabled();
      });
    });
  });

  describe("Submit", () => {
    it("performs provided action if the sign up is successful", async () => {
      const onSubmit = jest.fn();
      render(<SignUpForm onSubmit={onSubmit} />);

      const formState: FormState = {
        firstName: "Test first name",
        lastName: "Test last name",
        emailAddress: "email@test.com",
        dateOfBirth: "2021-11-10",
        password: "testpassword",
        confirmPassword: "testpassword",
      };
      updateFormState(formState);

      fireEvent.click(getSubmitButton());

      await waitFor(() =>
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
      );

      expect(onSubmit).toHaveBeenCalledWith({
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.emailAddress,
        dateOfBirth: formState.dateOfBirth,
        password: formState.password,
      } as CreateUserRequestDto);
    });

    it("does not perform any action if passwords do not match", async () => {
      const onSubmit = jest.fn();
      render(<SignUpForm onSubmit={onSubmit} />);
      updateFormState({
        firstName: "Test first name",
        lastName: "Test last name",
        emailAddress: "email@test.com",
        dateOfBirth: "2021-11-10",
        password: "testpassword",
        confirmPassword: "non-matching password",
      });

      fireEvent.click(getSubmitButton());

      await waitFor(() =>
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument()
      );

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});

function getFirstNameField(): HTMLInputElement {
  return screen.getByPlaceholderText("First name") as HTMLInputElement;
}

function getLastNameField(): HTMLInputElement {
  return screen.getByPlaceholderText("Last name") as HTMLInputElement;
}

function getEmailAddressField(): HTMLInputElement {
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

function updateFormState(formState: FormState) {
  if (formState.firstName) {
    setValue(getFirstNameField(), formState.firstName);
  }

  if (formState.lastName) {
    setValue(getLastNameField(), formState.lastName);
  }

  if (formState.emailAddress) {
    setValue(getEmailAddressField(), formState.emailAddress);
  }

  if (formState.dateOfBirth) {
    setValue(getDateOfBirthField(), formState.dateOfBirth);
  }

  if (formState.password) {
    setValue(getPasswordField(), formState.password);
  }

  if (formState.confirmPassword) {
    setValue(getConfirmPasswordField(), formState.confirmPassword);
  }
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
