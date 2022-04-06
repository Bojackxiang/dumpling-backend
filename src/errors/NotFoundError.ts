import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 500;
  reason = "找不到用户";

  constructor() {
    super("找不到路径");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
