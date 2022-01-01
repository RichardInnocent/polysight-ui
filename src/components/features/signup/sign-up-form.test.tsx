import React from "react";
import SignUpForm from "./sign-up-form";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import dayjs from "dayjs";
import { CreateUserRequestDto } from "../../../common/hosts/auth/auth";

const limits = {
  firstNameMaxLength: 32,
  lastNameMaxLength: 32,
  emailAddressMaxLength: 128,
  passwordMinLength: 8,
};

const onSubmit = jest.fn();

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
    render(<SignUpForm onSubmit={onSubmit} />);
  });

  describe("Validation", () => {
    describe("First name", () => {
      it("displays a warning and disables the sign up button if the first name is not entered", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const firstNameInputField = getFirstNameField(renderResult);
        fireEvent.focus(firstNameInputField);
        fireEvent.blur(firstNameInputField);

        expect(
          renderResult.getByText("Please provide your first name")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the first name is ${
        limits.firstNameMaxLength + 1
      } long`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getFirstNameField(renderResult),
          "a".repeat(limits.firstNameMaxLength + 1)
        );

        expect(
          renderResult.getByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it("accepts the input if the first name is one character long", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(getFirstNameField(renderResult), "a");

        expect(
          renderResult.queryByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });

      it(`accepts the input if the first name is ${limits.firstNameMaxLength} characters long`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getFirstNameField(renderResult),
          "a".repeat(limits.firstNameMaxLength)
        );

        expect(
          renderResult.queryByText(
            `Must be ${limits.firstNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });
    });

    describe("Last name", () => {
      it("displays a warning and disables the sign up button if the last name is not entered", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const lastNameInputField = getLastNameField(renderResult);
        fireEvent.focus(lastNameInputField);
        fireEvent.blur(lastNameInputField);

        expect(
          renderResult.getByText("Please provide your last name")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the last name is ${
        limits.lastNameMaxLength + 1
      } long`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getLastNameField(renderResult),
          "a".repeat(limits.lastNameMaxLength + 1)
        );

        expect(
          renderResult.getByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it("accepts the input if the last name is one character long", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(getLastNameField(renderResult), "a");

        expect(
          renderResult.queryByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });

      it(`accepts the input if the last name is ${limits.lastNameMaxLength} characters long`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getLastNameField(renderResult),
          "a".repeat(limits.lastNameMaxLength)
        );

        expect(
          renderResult.queryByText(
            `Must be ${limits.lastNameMaxLength} characters or fewer`
          )
        ).not.toBeInTheDocument();
        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });
    });

    describe("Email address", () => {
      it("displays a warning and disables the sign up button if the email address is not entered", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const emailInputField = getEmailAddressField(renderResult);
        fireEvent.focus(emailInputField);
        fireEvent.blur(emailInputField);

        expect(
          renderResult.getByText("Please provide your email address")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the email address is ${
        limits.emailAddressMaxLength + 1
      } long`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getEmailAddressField(renderResult),
          "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 4)
        );

        expect(
          renderResult.getByText(
            `Must be ${limits.emailAddressMaxLength} characters or fewer`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the email address invalid`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(getEmailAddressField(renderResult), "invalid email address");

        expect(
          renderResult.getByText("Email address is invalid")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it("accepts the input if the email is five characters long and valid", () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(getEmailAddressField(renderResult), "a@b.c");

        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });

      it(`accepts the input if the email is ${limits.emailAddressMaxLength} characters long and valid`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getEmailAddressField(renderResult),
          "a@b.c" + "a".repeat(limits.emailAddressMaxLength - 5)
        );

        expect(getSubmitButton(renderResult)).not.toBeDisabled();
      });
    });

    describe("Date of birth", () => {
      it(`displays a warning and disables the sign up button if the date of birth field is invalid`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const dateOfBirthField = getDateOfBirthField(renderResult);
        fireEvent.focus(dateOfBirthField);
        fireEvent.blur(dateOfBirthField);

        expect(
          renderResult.getByText("Please provide your date of birth")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the date of birth is in the future`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getDateOfBirthField(renderResult),
          dayjs().add(1, "day").format("YYYY-MM-DD")
        );

        expect(
          renderResult.getByText(
            "Date of birth can't be in the future... right?... Is that you Marty?"
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });
    });

    describe("Password", () => {
      it(`displays a warning and disables the sign up button if the password is not set`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const passwordField = getPasswordField(renderResult);
        fireEvent.focus(passwordField);
        fireEvent.blur(passwordField);

        expect(
          renderResult.getByText(
            "Please provide a password to protect your account"
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });

      it(`displays a warning and disables the sign up button if the password is less than ${limits.passwordMinLength} characters`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        setValue(
          getPasswordField(renderResult),
          "a".repeat(limits.passwordMinLength - 1)
        );

        expect(
          renderResult.getByText(
            `The password must be at least ${limits.passwordMinLength} characters long`
          )
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });
    });

    describe("Confirm password", () => {
      it(`displays a warning and disables the sign up button if the confirm password field is not filled`, () => {
        const renderResult = render(<SignUpForm onSubmit={onSubmit} />);

        const confirmPasswordField = getConfirmPasswordField(renderResult);
        fireEvent.focus(confirmPasswordField);
        fireEvent.blur(confirmPasswordField);

        expect(
          renderResult.getByText("Please re-enter your password")
        ).toBeInTheDocument();
        expect(getSubmitButton(renderResult)).toBeDisabled();
      });
    });
  });

  describe("Submit", () => {
    it("performs provided action if the sign up is successful", async () => {
      const renderResult: RenderResult = render(
        <SignUpForm onSubmit={onSubmit} />
      );

      const formState: FormState = {
        firstName: "Test first name",
        lastName: "Test last name",
        emailAddress: "email@test.com",
        dateOfBirth: "2021-11-10",
        password: "testpassword",
        confirmPassword: "testpassword",
      };
      updateFormState(formState, renderResult);

      fireEvent.click(getSubmitButton(renderResult));

      expect(onSubmit).toHaveBeenCalledWith({
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.emailAddress,
        dateOfBirth: formState.dateOfBirth,
        password: formState.password,
      } as CreateUserRequestDto);
    });

    it("does not perform any action if passwords do not match", async () => {
      const renderResult: RenderResult = render(
        <SignUpForm onSubmit={onSubmit} />
      );
      updateFormState(
        {
          firstName: "Test first name",
          lastName: "Test last name",
          emailAddress: "email@test.com",
          dateOfBirth: "2021-11-10",
          password: "testpassword",
          confirmPassword: "non-matching password",
        },
        renderResult
      );

      fireEvent.click(getSubmitButton(renderResult));
      await waitFor(() =>
        expect(
          renderResult.getByText("Passwords do not match")
        ).toBeInTheDocument()
      );

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});

function getFirstNameField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByPlaceholderText("First name") as HTMLInputElement;
}

function getLastNameField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByPlaceholderText("Last name") as HTMLInputElement;
}

function getEmailAddressField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByPlaceholderText("Email address") as HTMLInputElement;
}

function getDateOfBirthField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByLabelText("Date of birth") as HTMLInputElement;
}

function getPasswordField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByPlaceholderText("Password") as HTMLInputElement;
}

function getConfirmPasswordField(renderResult: RenderResult): HTMLInputElement {
  return renderResult.getByPlaceholderText(
    "Confirm password"
  ) as HTMLInputElement;
}

function getSubmitButton(renderResult: RenderResult): HTMLButtonElement {
  return renderResult.getByRole("button") as HTMLButtonElement;
}

function updateFormState(formState: FormState, renderResult: RenderResult) {
  if (formState.firstName) {
    setValue(getFirstNameField(renderResult), formState.firstName);
  }

  if (formState.lastName) {
    setValue(getLastNameField(renderResult), formState.lastName);
  }

  if (formState.emailAddress) {
    setValue(getEmailAddressField(renderResult), formState.emailAddress);
  }

  if (formState.dateOfBirth) {
    setValue(getDateOfBirthField(renderResult), formState.dateOfBirth);
  }

  if (formState.password) {
    setValue(getPasswordField(renderResult), formState.password);
  }

  if (formState.confirmPassword) {
    setValue(getConfirmPasswordField(renderResult), formState.confirmPassword);
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
