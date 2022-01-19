import { AuthService, newAuthService } from "./auth/auth";

export interface HostConfig {
  authService: AuthService;
}

export const routes: HostConfig = {
  authService: newAuthService("/api/auth"),
};

export default HostConfig;
