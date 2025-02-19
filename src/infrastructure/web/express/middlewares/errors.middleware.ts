import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { ApplicationError, ValidationError } from '@/application/errors';
import {
  DATABASE_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_INPUT_DATA,
  INVALID_JSON_FORMAT,
  RESOURCE_ALREADY_EXISTS,
} from '@/application/messages/common.messages';
import { HttpResponse } from '@/application/payloads/http-response';
import { parseErrorAsString } from '@/infrastructure/logging/error-parser';
import { logger } from '@/infrastructure/logging/logger';

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  const httpResponse = new HttpResponse(500, false, INTERNAL_SERVER_ERROR);
  if (err instanceof SyntaxError && 'body' in err) {
    httpResponse.statusCode = 400;
    httpResponse.message = INVALID_JSON_FORMAT;
    httpResponse.data = {
      message: err.message,
      body: err.body,
    };
  }
  if (err instanceof ApplicationError) {
    httpResponse.statusCode = err.statusCode;
    httpResponse.message = err.message;
    if (err instanceof ValidationError) {
      httpResponse.data = err.details;
    }
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      httpResponse.statusCode = 400;
      httpResponse.message = RESOURCE_ALREADY_EXISTS;
    } else {
      httpResponse.message = DATABASE_ERROR;
    }
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    httpResponse.statusCode = 400;
    httpResponse.message = err.message.split('\n').pop() || INVALID_INPUT_DATA;
    httpResponse.data = err.message;
  }

  if (httpResponse.statusCode === 500) {
    logger.error(parseErrorAsString(err));
  }

  res.status(httpResponse.statusCode).json(httpResponse.toJSON());
}
