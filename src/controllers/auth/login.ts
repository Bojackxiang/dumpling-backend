import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as auth from "../../services/auth";

const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw errors;
    }
    const { email, password } = req.body;
    const result = auth.login({ username: email, password: password });
    // check result
    if (result.getSuccess()) {
    } else {
      throw result;
    }
  } catch (error) {
    res.json({
      success: false,
    });
  }

  res.json({
    success: true,
  });
};

export default login;
