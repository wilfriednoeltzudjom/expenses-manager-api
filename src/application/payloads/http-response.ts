export class HttpResponse<T> {
  readonly success: boolean;
  readonly statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, success: boolean, message?: string, data?: T) {
    this.statusCode = statusCode;
    this.success = success;
    if (message) this.message = message;
    if (data) this.data = data;
  }

  toJSON() {
    const json: Partial<HttpResponse<T>> = { success: this.success, statusCode: this.statusCode };
    if (this.message) json.message = this.message;
    if (this.data) json.data = this.data;

    return json;
  }

  static created<T>(data?: T, message?: string) {
    return new HttpResponse(201, true, message, data);
  }

  static succeeded<T>(data?: T, message?: string) {
    return new HttpResponse(200, true, message, data);
  }
}
