export class HttpRequest {
  readonly body: unknown;
  readonly params: unknown;
  readonly query: unknown;
  readonly user: { id: string };

  constructor(body: unknown, params: unknown, query: unknown, user: unknown) {
    this.body = body;
    this.params = params;
    this.query = query;
    this.user = user as { id: string };
  }

  static instance({ body, params, query, user }: { body?: unknown; params?: unknown; query?: unknown; user?: { id: string } }) {
    return new HttpRequest(body, params, query, user);
  }
}
