export class BaseError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code || 'UNKNOWN_ERROR';
  }
}
