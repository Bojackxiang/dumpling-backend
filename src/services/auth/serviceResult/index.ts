/**
 * 只要是 service 报错，那么这边就会构建 service error
 */
export default class ServiceResult<T> {
  code?: Number;
  message?: string;
  success: boolean;
  data?: T;

  constructor(code?: number, message?: string, success?: boolean, data?: T) {
    this.code = code ?? 200;
    this.message = message ?? 'success';
    this.success = success ?? true
    this.data = data ?? null;
  }

  getSuccess(){
    return this.success
  }

  getResult (){
    return {
      code: this.code,
      message: this.message,
      success: this.success,
      data: this.data,
    }
  }

}
