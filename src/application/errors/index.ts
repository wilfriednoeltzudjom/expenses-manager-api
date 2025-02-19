export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, name = 'ApplicationError', statusCode = 500) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  toString() {
    return `${this.name}: ${this.statusCode} - ${this.message}`;
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

export class ResourceNotFoundError extends ApplicationError {
  constructor(message: string) {
    super(message, 'ResourceNotFoundError', 404);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

export class InvalidCredentialsError extends ApplicationError {
  constructor(message: string) {
    super(message, 'InvalidCredentialsError', 401);
  }
}

export class ValidationError extends ApplicationError {
  details: unknown;

  constructor(message: string, validationErrors: any[]) {
    super(message, 'ValidationError', 400);
    this.details = validationErrors;
  }
}
