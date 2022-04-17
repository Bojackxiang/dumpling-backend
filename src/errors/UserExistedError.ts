import { CustomError } from './custom-error';

export class UserExistedError extends CustomError {
    statusCode = 500;
    reason = '用户邮箱已经存在';

    constructor() {
        super('用户邮箱已经存在');

        Object.setPrototypeOf(this, UserExistedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
