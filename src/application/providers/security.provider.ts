export interface SecurityProvider {
  hash(value: string): Promise<string>;
  compareHash(value: string, hashedValue: string): Promise<boolean>;
}
