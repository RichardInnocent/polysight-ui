export interface HostConfig {
  polysightAuth: PolysightAuthConfig,
}

export interface PolysightAuthConfig {
  baseRoute: () => string,
  usersRoute: () => string,
  authenticateRoute: () => string
}

export function createPolysightAuthConfig(baseRoute: string): PolysightAuthConfig {
  return {
    baseRoute: () => baseRoute,
    usersRoute: () => baseRoute + "/users",
    authenticateRoute: () => baseRoute + "/authenticate"
  }
}

export const developmentConfig: HostConfig = {
  polysightAuth: createPolysightAuthConfig("localhost:8080")
}

export default HostConfig;