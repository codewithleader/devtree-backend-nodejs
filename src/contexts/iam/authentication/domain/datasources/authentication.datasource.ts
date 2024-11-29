export abstract class AuthenticationDatasource {
  abstract login(email: string, password: string): Promise<any>;
  abstract register(
    name: string,
    email: string,
    password: string
  ): Promise<any>;
}
