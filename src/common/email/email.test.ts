import isValidEmail from "./email";

describe("email", () => {
  it("matches a valid email address", () => {
    expect(isValidEmail("valid@email.com")).toBe(true);
  });

  it("identifies a single word as an invalid email address", () => {
    expect(isValidEmail("user")).toBe(false);
  });

  it("identifies a string without a period after the @ as an invalid email address", () => {
    expect(isValidEmail("user@test")).toBe(false);
  });

  it("identifies a string without an @ symbol as an invalid email address", () => {
    expect(isValidEmail("usertest.com")).toBe(false);
  });

  it("identifies a string starting with an @ symbol to be an invalid email address", () => {
    expect(isValidEmail("@test.com")).toBe(false);
  });

  it("identifies a string ending with a period as an invalid email address", () => {
    expect(isValidEmail("user@test.")).toBe(false);
  });
});
