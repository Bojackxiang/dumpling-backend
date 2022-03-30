import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {signUp} from "../../services/auth";

const signup = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw errors;
  }

  const { email, password, nick_name, phone } = req.body;

  signUp({
    email,
    password,
    nick_name,
    phone
  })

  res.json({
    success: true
  })
};

export default signup;
