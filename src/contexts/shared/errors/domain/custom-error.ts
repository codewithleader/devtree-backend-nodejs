export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'CustomError';
  }
}
