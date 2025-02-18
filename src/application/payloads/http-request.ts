export class HttpRequest {
  readonly body: Record<string, unknown>;
  readonly params: Record<string, unknown>;
  readonly query: Record<string, unknown>;
  readonly user: Record<'id', string>;

  constructor(body: Record<string, unknown>, params: Record<string, unknown>, query: Record<string, unknown>, user: Record<'id', string>) {
    this.body = body;
    this.params = params;
    this.query = query;
    this.user = user;
  }

  static create({
    body,
    params,
    query,
    user,
  }: {
    body: Record<string, unknown>;
    params: Record<string, unknown>;
    query: Record<string, unknown>;
    user: Record<'id', string>;
  }) {
    return new HttpRequest(body, params, query, user);
  }
}
