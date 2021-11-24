import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../../inputs/label";
import Input from "../../inputs/input";
import colours from "../../../common/colours/colours";
import { isValidEmail } from "../../../common/email/email";
import dayjs from "dayjs";
import axios from "axios";
import { HostConfig } from "../../../common/hosts/hosts";
import Button from "../../inputs/button";

const limits = {
  firstNameMaxLength: 32,
  lastNameMaxLength: 32,
  emailAddressMaxLength: 128,
  passwordMinLength: 8,
};

const StyledSignUpForm = styled.form`
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  grid-gap: 10px;
`;

const SignUpHeading = styled.h1`
  color: ${colours.colour1};
  grid-column: span 2;
  text-align: center;
`;

const ErrorField = styled.div`
  color: ${colours.errorColour};
  font-size: 0.8em;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailAddressContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
`;

const EmailAddressField = styled(Input)`
  flex-grow: 100;
`;

const DateContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
`;

const DateOfBirthLabel = styled(Label)`
  font-size: 0.8em;
  margin-bottom: 5px;
`;

const DateField = styled(Input)`
  flex-grow: 100;
`;

const PasswordContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
`;

const PasswordField = styled(Input)`
  grid-column: span 2;
`;

const SignUpContainer = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
`;

const validateFirstName = (value: string): string => {
  if (value.length < 1) {
    return "Please provide your first name";
  }
  return value.length > limits.firstNameMaxLength
    ? `Must be ${limits.firstNameMaxLength} characters or fewer`
    : "";
};

const validateLastName = (value: string): string => {
  if (value.length < 1) {
    return "Please provide your last name";
  }
  return value.length > limits.lastNameMaxLength
    ? `Must be ${limits.lastNameMaxLength} characters or fewer`
    : "";
};

const validateEmailAddress = (value: string): string => {
  if (value.length < 1) {
    return "Please provide your email address";
  }
  if (value.length < 5) {
    return "Your email address must be at least 5 characters long";
  }
  if (value.length > limits.emailAddressMaxLength) {
    return `Must be ${limits.emailAddressMaxLength} characters or fewer`;
  }
  return isValidEmail(value) ? "" : "Email address is invalid";
};

const validateDateOfBirth = (value: string): string => {
  const date = dayjs(value);
  if (!date.isValid()) {
    return "Please provide your date of birth";
  }
  return date.isAfter(dayjs().startOf("day"))
    ? "Date of birth can't be in the future... right?... Is that you Marty?"
    : "";
};

const validatePassword = (value: string): string => {
  if (value.length < 1) {
    return "Please provide a password to protect your account";
  }
  return value.length < limits.passwordMinLength
    ? `The password must be at least ${limits.passwordMinLength} characters long`
    : "";
};

const validateConfirmPassword = (value: string): string => {
  return value.length < 1 ? "Please re-enter your password" : "";
};

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  dateOfBirthError: string;
  passwordError: string;
  confirmPasswordError: string;
  submitted: boolean;
  submitError: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface SignUpFormProps {
  onSuccess?: (userDetails: UserDetails) => void;
  hosts: HostConfig;
}

export const SignUpForm = ({
  hosts,
  onSuccess,
}: SignUpFormProps): JSX.Element => {
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    dateOfBirthError: "",
    passwordError: "",
    confirmPasswordError: "",
    submitted: false,
    submitError: "",
  });

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState };
    newFormState.firstName = e.target.value;
    newFormState.firstNameError = validateFirstName(e.target.value);
    setFormState(newFormState);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState };
    newFormState.lastName = e.target.value;
    newFormState.lastNameError = validateLastName(e.target.value);
    setFormState(newFormState);
  };

  const handleEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState };
    newFormState.email = e.target.value;
    newFormState.emailError = validateEmailAddress(e.target.value);
    setFormState(newFormState);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState };
    newFormState.dateOfBirth = e.target.value;
    newFormState.dateOfBirthError = validateDateOfBirth(e.target.value);
    setFormState(newFormState);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState };
    newFormState.password = e.target.value;
    newFormState.passwordError = validatePassword(e.target.value);
    setFormState(newFormState);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFormState = { ...formState };
    newFormState.confirmPassword = e.target.value;
    newFormState.confirmPasswordError = validateConfirmPassword(e.target.value);
    setFormState(newFormState);
  };

  const errorsExistInForm = (state: FormState): boolean => {
    return (
      state.firstNameError.length > 0 ||
      state.lastNameError.length > 0 ||
      state.emailError.length > 0 ||
      state.dateOfBirthError.length > 0 ||
      state.passwordError.length > 0 ||
      state.confirmPasswordError.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the reloading of the page

    const newFormState = { ...formState };
    newFormState.firstNameError = validateFirstName(formState.firstName);
    newFormState.lastNameError = validateLastName(formState.lastName);
    newFormState.emailError = validateEmailAddress(formState.email);
    newFormState.dateOfBirthError = validateDateOfBirth(formState.dateOfBirth);
    newFormState.passwordError = validatePassword(formState.password);
    newFormState.confirmPasswordError = validatePassword(
      formState.confirmPassword
    );

    if (!newFormState.confirmPasswordError) {
      newFormState.confirmPasswordError =
        newFormState.password === newFormState.confirmPassword
          ? ""
          : "Passwords do not match";
    }

    newFormState.submitted = true;
    setFormState(newFormState);

    if (errorsExistInForm(newFormState)) {
      newFormState.submitted = false;
      setFormState(newFormState);
      return;
    }

    axios
      .post(hosts.polysightAuth.usersRoute(), {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        dateOfBirth: formState.dateOfBirth,
        password: formState.password,
      })
      .then(() => {
        if (onSuccess) {
          const userDetails: UserDetails = {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            dateOfBirth: formState.dateOfBirth,
          };
          onSuccess(userDetails);
        }
      })
      .catch(() => {
        const newFormState = { ...formState };
        newFormState.submitted = false;
        newFormState.submitError = "An error occurred. Please try again later.";
        setFormState(newFormState);
      });
  };

  return (
    <StyledSignUpForm onSubmit={handleSubmit}>
      <SignUpHeading>Sign up</SignUpHeading>
      <NameContainer>
        <Input
          type="text"
          placeholder="First name"
          maxLength={32}
          onBlur={handleFirstNameChange}
          errorState={formState.firstNameError.length > 0}
        />
        <ErrorField>{formState.firstNameError}</ErrorField>
      </NameContainer>
      <NameContainer>
        <Input
          type="text"
          placeholder="Last name"
          maxLength={32}
          onBlur={handleLastNameChange}
          errorState={formState.lastNameError.length > 0}
        />
        <ErrorField>{formState.lastNameError}</ErrorField>
      </NameContainer>
      <EmailAddressContainer>
        <EmailAddressField
          type="email"
          placeholder="Email address"
          maxLength={128}
          onBlur={handleEmailAddressChange}
          errorState={formState.emailError.length > 0}
        />
        <ErrorField>{formState.emailError}</ErrorField>
      </EmailAddressContainer>
      <DateContainer>
        <DateOfBirthLabel htmlFor="dateOfBirth">Date of birth</DateOfBirthLabel>
        <DateField
          id="dateOfBirth"
          type="date"
          onBlur={handleDateOfBirthChange}
          errorState={formState.dateOfBirthError.length > 0}
        />
        <ErrorField>{formState.dateOfBirthError}</ErrorField>
      </DateContainer>
      <PasswordContainer>
        <PasswordField
          type="password"
          placeholder="Password"
          onBlur={handlePasswordChange}
          errorState={formState.passwordError.length > 0}
        />
        <ErrorField>{formState.passwordError}</ErrorField>
      </PasswordContainer>
      <PasswordContainer>
        <PasswordField
          type="password"
          placeholder="Confirm password"
          onBlur={handleConfirmPasswordChange}
          errorState={formState.confirmPasswordError.length > 0}
        />
        <ErrorField>{formState.confirmPasswordError}</ErrorField>
      </PasswordContainer>
      <SignUpContainer>
        <Button
          primary
          type="submit"
          disabled={errorsExistInForm(formState) || formState.submitted}
          title={
            errorsExistInForm(formState)
              ? "Please address the errors in the form before submitting"
              : ""
          }
          showSpinnerOnLoad={true}
        >
          Sign up
        </Button>
        <ErrorField>{formState.submitError}</ErrorField>
      </SignUpContainer>
    </StyledSignUpForm>
  );
};

export default SignUpForm;
