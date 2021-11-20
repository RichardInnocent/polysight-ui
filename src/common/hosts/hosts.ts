export interface HostConfig {
  polysightAuth: PolysightAuthConfig,
}

export interface PolysightAuthConfig {
  baseRoute: () => string,
  usersRoute: () => string,
}

export function createPolysightAuthConfig(baseRoute: string): PolysightAuthConfig {
  return {
    baseRoute: () => baseRoute,
    usersRoute: () => baseRoute + "/users",
  }
}

export default HostConfig;