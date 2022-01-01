import axios from "axios";
import { throwIfNot2xx } from "../../http/axios-helper";

export interface AuthService {
  baseRoute: string;
  users: UsersApi;
  authenticate: Authenticate;
}

export const newAuthService = (baseRoute: string): AuthService => {
  return {
    baseRoute: baseRoute,
    users: newUserApi(baseRoute + "/users"),
    authenticate: newAuthenticateApi(baseRoute + "/authenticate"),
  } as AuthService;
};

export const newUserApi = (baseRoute: string): UsersApi => {
  return {
    baseRoute: baseRoute,
    createUser: (user: CreateUserRequestDto) => {
      return axios
        .post<CreateUserResponseDto>(baseRoute, user)
        .then((response) => {
          throwIfNot2xx(response);
          return response.data;
        });
    },
  } as UsersApi;
};

/**
 * Route for interacting with user information.
 */
export interface UsersApi {
  /**
   * The base route.
   */
  baseRoute: string;

  /**
   * Used to create a user.
   * @param user The details that will be used to create the user.
   */
  createUser: (user: CreateUserRequestDto) => Promise<CreateUserResponseDto>;
}

/**
 * Request body to create a user.
 */
export interface CreateUserRequestDto {
  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's date of birth.
   */
  dateOfBirth: string;

  /**
   * The user's password.
   */
  password: string;
}

export interface CreateUserResponseDto {
  /**
   * The user's ID.
   */
  id: number;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's date of birth.
   */
  dateOfBirth: string;

  /**
   * The user's account status.
   */
  accountStatus: "active" | "disabled";
}

export const newAuthenticateApi = (baseRoute: string): Authenticate => {
  return {
    baseRoute: baseRoute,
    login: (credentials: LoginRequestDto) => {
      return axios
        .post<LoginResponseDto>(baseRoute, credentials)
        .then((response) => {
          throwIfNot2xx(response);
          return response.data;
        });
    },
  } as Authenticate;
};

/**
 * Used to authenticate in the system.
 */
export interface Authenticate {
  /**
   * The base route for the authenticate route.
   */
  baseRoute: string;

  /**
   * Used to log in to the system.
   * @param credentials The user's credentials.
   */
  login: (credentials: LoginRequestDto) => Promise<LoginResponseDto>;
}

/**
 * The request body used to log in.
 */
export interface LoginRequestDto {
  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's password.
   */
  password: string;
}

/**
 * The response from the log in API.
 */
export interface LoginResponseDto {
  /**
   * The user's access token that should be sent with subsequent request to demonstrate their identity.
   */
  access_token: string;

  /**
   * The type of token.
   */
  token_type: string;

  /**
   * The number of seconds until the token will expire from when it was originally created.
   */
  expires_in: number;
}
