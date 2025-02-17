import bcrypt from 'bcrypt';

import { SecurityProvider } from '@/application/providers/security.provider';

export class BcryptProvider implements SecurityProvider {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  async compareHash(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue);
  }
}
