import { AuthService, newAuthService } from "./auth/auth";

export interface HostConfig {
  authService: AuthService;
}

export const developmentConfig: HostConfig = {
  authService: newAuthService("http://localhost:8080"),
};

export default HostConfig;
