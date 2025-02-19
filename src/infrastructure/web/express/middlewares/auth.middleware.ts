import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/application/errors';
import { INVALID_TOKEN, NO_TOKEN_PROVIDED } from '@/application/messages/common.messages';
import { WebTokenProvider } from '@/application/providers/webtoken.provider';
import { container } from '@/config/container';
import { UserRepository } from '@/domain/repositories/user.repository';

export async function authMiddleware(req: Request & { user?: { id: string } }, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedError(NO_TOKEN_PROVIDED);
  }

  const webTokenProvider = container.resolve<WebTokenProvider>('WebTokenProvider');
  const webTokenPayload = await webTokenProvider.verify(token, process.env.JWT_SECRET!);
  if (!webTokenPayload.id) {
    throw new UnauthorizedError(INVALID_TOKEN);
  }

  const userRepository = container.resolve<UserRepository>('UserRepository');
  const user = await userRepository.findById(webTokenPayload.id);
  if (!user) {
    throw new UnauthorizedError(INVALID_TOKEN);
  }
  req.user = { id: user.id };
  next();
}
