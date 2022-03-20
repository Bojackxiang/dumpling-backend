import { Request, Response } from "express";
import { validationResult } from "express-validator";

const signup = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw errors;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  res.json({})
};

export default signup;
