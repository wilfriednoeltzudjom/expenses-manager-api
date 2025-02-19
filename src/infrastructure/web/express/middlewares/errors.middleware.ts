import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { ApplicationError } from '@/application/errors';
import { DATABASE_ERROR, INTERNAL_SERVER_ERROR, RESOURCE_ALREADY_EXISTS } from '@/application/messages/common.messages';
import { HttpResponse } from '@/application/payloads/http-response';

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  const httpResponse = new HttpResponse(500, false, INTERNAL_SERVER_ERROR);
  if (err instanceof ApplicationError) {
    httpResponse.statusCode = err.statusCode;
    httpResponse.message = err.message;
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      httpResponse.statusCode = 400;
      httpResponse.message = RESOURCE_ALREADY_EXISTS;
    } else {
      httpResponse.message = DATABASE_ERROR;
    }
  }
  res.status(httpResponse.statusCode).json(httpResponse.toJSON());
}
