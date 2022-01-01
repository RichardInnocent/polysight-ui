import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  newAuthService,
  newAuthenticateApi,
  newUserApi,
} from "./auth";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAdapter = new MockAdapter(axios);

describe("auth", () => {
  const baseRoute = "https://application.com";
  describe("auth config", () => {
    it("configures the routes with the correct base routes", () => {
      const config = newAuthService(baseRoute);
      expect(config.baseRoute).toBe(baseRoute);
      expect(config.users.baseRoute).toBe(`${baseRoute}/users`);
      expect(config.authenticate.baseRoute).toBe(`${baseRoute}/authenticate`);
    });
  });

  describe("users", () => {
    const users = newUserApi(baseRoute);

    describe("create", () => {
      const createUserRequestBody = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@test.com",
        dateOfBirth: "2021-12-31",
        password: "test_password",
      } as CreateUserRequestDto;

      it("returns the created user on success", async () => {
        const createUserResponseBody = {
          id: 7,
          firstName: createUserRequestBody.firstName,
          lastName: createUserRequestBody.lastName,
          email: createUserRequestBody.email,
          dateOfBirth: createUserRequestBody.dateOfBirth,
          accountStatus: "active",
        } as CreateUserResponseDto;

        mockAdapter
          .onPost(baseRoute, createUserRequestBody)
          .reply(200, createUserResponseBody);

        const response = await users.createUser(createUserRequestBody);
        expect(response).toEqual(createUserResponseBody);
      });

      it("throws an error if the API does not give a 2xx response code", async () => {
        mockAdapter.onPost(baseRoute, createUserRequestBody).reply(400);

        try {
          await users.createUser(createUserRequestBody);
          fail("No exception thrown");
        } catch {
          // ignore
        }
      });
    });
  });

  describe("authenticate", () => {
    const authenticate = newAuthenticateApi(baseRoute);

    describe("authenticate", () => {
      const loginRequestBody = {
        email: "john.smith@test.com",
        password: "test_password",
      } as LoginRequestDto;

      it("returns the token on success", async () => {
        const loginResponseBody = {
          access_token: "dummy.access.token",
          token_type: "jwt",
          expires_in: 3600,
        } as LoginResponseDto;

        mockAdapter
          .onPost(baseRoute, loginRequestBody)
          .reply(200, loginResponseBody);

        const response = await authenticate.login(loginRequestBody);
        expect(response).toEqual(loginResponseBody);
      });

      it("throws an error if the API does not give a 2xx response code", async () => {
        mockAdapter.onPost(baseRoute, loginRequestBody).reply(400);

        try {
          await authenticate.login(loginRequestBody);
          fail("No exception thrown");
        } catch {
          // ignore
        }
      });
    });
  });
});
