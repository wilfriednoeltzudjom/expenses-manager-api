import jwt from 'jsonwebtoken';

import { WebTokenProvider } from '@/application/providers/webtoken.provider';

export class JsonWebTokenProvider implements WebTokenProvider {
  async sign(payload: object, secret: string, options: object): Promise<string> {
    return jwt.sign(payload, secret, options);
  }

  async verify(token: string, secret: string): Promise<{ id?: string }> {
    try {
      return jwt.verify(token, secret) as { id?: string };
    } catch (error) {
      return {};
    }
  }
}
