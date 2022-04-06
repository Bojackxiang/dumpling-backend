import { CustomError } from "./custom-error";

export class LoginError extends CustomError {
  statusCode = 500;
  reason = "登陆信息错误";

  constructor(message: string) {
    super(message ?? "登陆信息错误");
    this.reason = message ?? "登陆信息错误"

    Object.setPrototypeOf(this, LoginError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason}];
  }
}
