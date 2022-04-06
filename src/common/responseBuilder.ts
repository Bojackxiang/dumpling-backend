export interface IResponseBuilder {
  statusCode?: number;
  message?: string;
  data?: any;
  success?: true;
}

export default class CustomizedResponse {
  static responseBuilder(input: IResponseBuilder) {
    return {
      statusCode: input.statusCode || 0,
      success: input.success || true,
      message: input.message || "",
      payload: input.data || {},
    };
  }
}
