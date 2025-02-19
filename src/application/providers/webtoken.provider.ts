export interface WebTokenProvider {
  sign(payload: object, secret: string, options: object): Promise<string>;
  verify(token: string, secret: string): Promise<{ id?: string }>;
}
