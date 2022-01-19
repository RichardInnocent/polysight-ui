import { routes } from "./hosts";

describe("hosts", () => {
  describe("development config", () => {
    it("is configured correctly", () => {
      expect(routes.authService.baseRoute).toBe("/api/auth");
    });
  });
});
