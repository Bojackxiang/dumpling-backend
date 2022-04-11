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
      const parsedToken = jwt.verify(token, secret);
      return {
        data: parsedToken.data,
        success: true,
        token: token,
      };
    } catch (error) {
      return {
        success: false,
        token: token,
        data: undefined
      };
    }
  }
}

export default JWTUtils;
