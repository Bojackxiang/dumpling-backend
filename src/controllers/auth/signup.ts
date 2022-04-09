import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { messageObject } from "../../common";
import { RequestValidationError } from "../../errors/request-validation-error";
import { AppResponse } from "../../interfaces";
import { signUp } from "../../services/auth";

const signup = async (req: Request, res: AppResponse) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  const { email, password, nick_name, phone } = req.body;

  try {
    await signUp({
      email,
      password,
      nick_name,
      phone,
    });
  } catch (error) {
    throw error;
  }

  res.json({
    success: true,
    code: messageObject.SUCCESS_SIGN_UP.code,
    message: messageObject.SUCCESS_SIGN_UP.message,
  });
};

export default signup;
