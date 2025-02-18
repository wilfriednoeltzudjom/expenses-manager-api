export class BasicError extends Error {
  private statusCode: number;

  constructor(message: string, name = 'BasicError', statusCode = 500) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  toString() {
    return `${this.name}: ${this.statusCode} - ${this.message}`;
  }
}

export class BadRequestError extends BasicError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

export class ResourceNotFoundError extends BasicError {
  constructor(message: string) {
    super(message, 'ResourceNotFoundError', 404);
  }
}

export class UnauthorizedError extends BasicError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

export class InvalidCredentialsError extends BasicError {
  constructor(message: string) {
    super(message, 'InvalidCredentialsError', 401);
  }
}
