import { developmentConfig } from "./hosts";

describe("hosts", () => {
  describe("development config", () => {
    it("is configured correctly", () => {
      expect(developmentConfig.authService.baseRoute).toBe(
        "http://localhost:8080"
      );
    });
  });
});
