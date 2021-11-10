import React from "react";
import SignupForm from "./signup-form";
import { fireEvent, getByLabelText, render } from "@testing-library/react";
import dayjs from "dayjs";

const limits = {
  firstNameMaxLength: 32,
  lastNameMaxLength: 32,
  emailAddressMaxLength: 128,
  passwordMinLength: 8,
};

const placeholderText = {
  firstName: "First name",
  lastName: "Last name",
  emailAddress: "Email address",
  password: "Password",
  confirmPassord: "Confirm password",
};

it("renders successfully", () => {
  render(<SignupForm />);
});

describe("Validation", () => {
  describe("First name", () => {
    it("displays a warning and disables the sign up button if the first name is not entered", () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const firstNameInputField = getByPlaceholderText(
        placeholderText.firstName
      );
      fireEvent.focus(firstNameInputField);
      fireEvent.blur(firstNameInputField);

      expect(getByText("Please provide your first name")).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the first name is ${
      limits.firstNameMaxLength + 1
    } long`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const firstNameInputField = getByPlaceholderText(
        placeholderText.firstName
      );
      fireEvent.focus(firstNameInputField);
      fireEvent.change(firstNameInputField, {
        target: {
          value: "a".repeat(limits.firstNameMaxLength + 1),
        },
      });
      fireEvent.blur(firstNameInputField);

      expect(
        getByText(`Must be ${limits.firstNameMaxLength} characters or fewer`)
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it("accepts the input if the first name is one character long", () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <SignupForm />
      );

      const firstNameInputField = getByPlaceholderText(
        placeholderText.firstName
      );
      fireEvent.focus(firstNameInputField);
      fireEvent.change(firstNameInputField, {
        target: {
          value: "a",
        },
      });
      fireEvent.blur(firstNameInputField);

      expect(
        queryByText(`Must be ${limits.firstNameMaxLength} characters or fewer`)
      ).not.toBeInTheDocument();
      expect(getByRole("button")).not.toBeDisabled();
    });

    it(`accepts the input if the first name is ${limits.firstNameMaxLength} characters long`, () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <SignupForm />
      );

      const firstNameInputField = getByPlaceholderText(
        placeholderText.firstName
      );
      fireEvent.focus(firstNameInputField);
      fireEvent.change(firstNameInputField, {
        target: {
          value: "a".repeat(limits.firstNameMaxLength),
        },
      });
      fireEvent.blur(firstNameInputField);

      expect(
        queryByText(`Must be ${limits.firstNameMaxLength} characters or fewer`)
      ).not.toBeInTheDocument();
      expect(getByRole("button")).not.toBeDisabled();
    });
  });

  describe("Last name", () => {
    it("displays a warning and disables the sign up button if the last name is not entered", () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const lastNameInputField = getByPlaceholderText(placeholderText.lastName);
      fireEvent.focus(lastNameInputField);
      fireEvent.blur(lastNameInputField);

      expect(getByText("Please provide your last name")).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the last name is ${
      limits.lastNameMaxLength + 1
    } long`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const lastNameInputField = getByPlaceholderText(placeholderText.lastName);
      fireEvent.focus(lastNameInputField);
      fireEvent.change(lastNameInputField, {
        target: {
          value: "a".repeat(limits.lastNameMaxLength + 1),
        },
      });
      fireEvent.blur(lastNameInputField);

      expect(
        getByText(`Must be ${limits.lastNameMaxLength} characters or fewer`)
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it("accepts the input if the last name is one character long", () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <SignupForm />
      );

      const lastNameInputField = getByPlaceholderText(placeholderText.lastName);
      fireEvent.focus(lastNameInputField);
      fireEvent.change(lastNameInputField, {
        target: {
          value: "a",
        },
      });
      fireEvent.blur(lastNameInputField);

      expect(
        queryByText(`Must be ${limits.lastNameMaxLength} characters or fewer`)
      ).not.toBeInTheDocument();
      expect(getByRole("button")).not.toBeDisabled();
    });

    it(`accepts the input if the last name is ${limits.lastNameMaxLength} characters long`, () => {
      const { getByPlaceholderText, getByRole, queryByText } = render(
        <SignupForm />
      );

      const lastNameInputField = getByPlaceholderText(placeholderText.lastName);
      fireEvent.focus(lastNameInputField);
      fireEvent.change(lastNameInputField, {
        target: {
          value: "a".repeat(limits.lastNameMaxLength),
        },
      });
      fireEvent.blur(lastNameInputField);

      expect(
        queryByText(`Must be ${limits.lastNameMaxLength} characters or fewer`)
      ).not.toBeInTheDocument();
      expect(getByRole("button")).not.toBeDisabled();
    });
  });

  describe("Email address", () => {
    it("displays a warning and disables the sign up button if the email address is not entered", () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const emailInputField = getByPlaceholderText(
        placeholderText.emailAddress
      );
      fireEvent.focus(emailInputField);
      fireEvent.blur(emailInputField);

      expect(
        getByText("Please provide your email address")
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the email address is ${
      limits.emailAddressMaxLength + 1
    } long`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const emailInputField = getByPlaceholderText(
        placeholderText.emailAddress
      );
      fireEvent.focus(emailInputField);
      fireEvent.change(emailInputField, {
        target: {
          value: "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 4),
        },
      });
      fireEvent.blur(emailInputField);

      expect(
        getByText(`Must be ${limits.emailAddressMaxLength} characters or fewer`)
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the email address invalid`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const emailInputField = getByPlaceholderText(
        placeholderText.emailAddress
      );
      fireEvent.focus(emailInputField);
      fireEvent.change(emailInputField, {
        target: {
          value: "not an email address",
        },
      });
      fireEvent.blur(emailInputField);

      expect(getByText("Email address is invalid")).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it("accepts the input if the email is five characters long and valid", () => {
      const { getByPlaceholderText, getByRole } = render(<SignupForm />);

      const emailInputField = getByPlaceholderText(
        placeholderText.emailAddress
      );
      fireEvent.focus(emailInputField);
      fireEvent.change(emailInputField, {
        target: {
          value: "a@b.c",
        },
      });
      fireEvent.blur(emailInputField);

      expect(getByRole("button")).not.toBeDisabled();
    });

    it(`accepts the input if the email is ${limits.emailAddressMaxLength} characters long and valid`, () => {
      const { getByPlaceholderText, getByRole } = render(<SignupForm />);

      const emailInputField = getByPlaceholderText(
        placeholderText.emailAddress
      );
      fireEvent.focus(emailInputField);
      fireEvent.change(emailInputField, {
        target: {
          value: "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 5),
        },
      });
      fireEvent.blur(emailInputField);

      expect(getByRole("button")).not.toBeDisabled();
    });
  });

  describe("Date of birth", () => {
    it(`displays a warning and disables the sign up button if the date of birth field is invalid`, () => {
      const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

      const dateOfBirthField = getByLabelText("Date of birth");
      fireEvent.focus(dateOfBirthField);
      fireEvent.blur(dateOfBirthField);

      expect(
        getByText("Please provide your date of birth")
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the date of birth is in the future`, () => {
      const { getByLabelText, getByRole, getByText } = render(<SignupForm />);

      const dateOfBirthField = getByLabelText("Date of birth");
      fireEvent.focus(dateOfBirthField);
      fireEvent.change(dateOfBirthField, {
        target: {
          value: dayjs().add(1, "day").format("YYYY-MM-DD"),
        },
      });
      fireEvent.blur(dateOfBirthField);

      expect(
        getByText(
          "Date of birth can't be in the future... right?... Is that you Marty?"
        )
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });
  });

  describe("Password", () => {
    it(`displays a warning and disables the sign up button if the password is not set`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const passwordField = getByPlaceholderText(placeholderText.password);
      fireEvent.focus(passwordField);
      fireEvent.blur(passwordField);

      expect(
        getByText("Please provide a password to protect your account")
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });

    it(`displays a warning and disables the sign up button if the password is less than ${limits.passwordMinLength} characters`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const passwordField = getByPlaceholderText(placeholderText.password);
      fireEvent.focus(passwordField);
      fireEvent.change(passwordField, {
        target: {
          value: "a".repeat(limits.passwordMinLength - 1),
        },
      });
      fireEvent.blur(passwordField);

      expect(
        getByText(
          `The password must be at least ${limits.passwordMinLength} characters long`
        )
      ).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });
  });

  describe("Confirm password", () => {
    it(`displays a warning and disables the sign up button if the confirm password field is not filled`, () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
        <SignupForm />
      );

      const confirmPasswordField = getByPlaceholderText(
        placeholderText.confirmPassord
      );
      fireEvent.focus(confirmPasswordField);
      fireEvent.blur(confirmPasswordField);

      expect(getByText("Please re-enter your password")).toBeInTheDocument();
      expect(getByRole("button")).toBeDisabled();
    });
  });
});
