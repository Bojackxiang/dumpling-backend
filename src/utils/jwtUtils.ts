import * as jwt from "jsonwebtoken";

class JWTUtils {
  static generateJWT<T>(data: T, secret: string, expiresIn: string = "24h") {
    if (!secret || !data) {
      return undefined;
    }
    return jwt.sign(
      {
        data,
      },
      secret,
      {
        expiresIn,
      }
    );
  }

  static verifyJWT(token: string, secret) {
    try {
      if (!token || !secret) {
        return undefined;
      }
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default JWTUtils;
