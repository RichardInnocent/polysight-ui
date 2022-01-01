import { AxiosResponse } from "axios";
import { throwIfNot2xx } from "./axios-helper";

describe("axios-helper", () => {
  describe("throwIfNot2xx", () => {
    const errorMessagePrefix = "Non-2xx status code returned";
    const simpleResponseBody = "Test response body";

    it("does not throw an error if the response code is 200", () => {
      throwIfNot2xx(createAxiosResponseMock(200, simpleResponseBody));
    });

    it("does not throw an error if the response is 299", () => {
      throwIfNot2xx(createAxiosResponseMock(299, simpleResponseBody));
    });

    it("throws an error if the response is 199", () => {
      try {
        throwIfNot2xx(createAxiosResponseMock(199, simpleResponseBody));
        fail("No error thrown");
      } catch (e: unknown) {
        expectErrorMessage(e).toBe(
          `${errorMessagePrefix}. Status: 199. Response: ${simpleResponseBody}`
        );
      }
    });

    it("throws an error if the response is 300", () => {
      try {
        throwIfNot2xx(createAxiosResponseMock(300, simpleResponseBody));
        fail("No error thrown");
      } catch (e: unknown) {
        expectErrorMessage(e).toBe(
          `${errorMessagePrefix}. Status: 300. Response: ${simpleResponseBody}`
        );
      }
    });

    describe("the response has a status code of 400", () => {
      const statusCode = 400;

      it("throws an error but does not append a reason if the response is empty", () => {
        try {
          throwIfNot2xx(createAxiosResponseMock(statusCode, ""));
          fail("No error thrown");
        } catch (e: unknown) {
          expectErrorMessage(e).toBe(
            `${errorMessagePrefix}. Status: ${statusCode}`
          );
        }
      });

      it("throws an error and converts the response to string if the response contains JSON", () => {
        try {
          throwIfNot2xx(
            createAxiosResponseMock(statusCode, {
              reason: "Invalid request",
            })
          );
          fail("No error thrown");
        } catch (e: unknown) {
          expectErrorMessage(e).toBe(
            `${errorMessagePrefix}. Status: ${statusCode}. Response: {"reason":"Invalid request"}`
          );
        }
      });
    });
  });
});

function createAxiosResponseMock<Type>(
  status: number,
  body: Type
): AxiosResponse<Type> {
  return {
    data: body,
    status: status,
  } as AxiosResponse<Type>;
}

function expectErrorMessage(e: unknown): jest.JestMatchers<string> {
  if (e instanceof Error) {
    return expect(e.message);
  } else {
    fail(`e is not an Error, but is instead of type ${typeof e}`);
  }
}
