import { Request, Response, NextFunction } from "express";
import { Token } from "../models";
import { JwtPayload } from "jsonwebtoken";
import { jwtValue, verifyToken } from "../helpers/jwt";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "invalid token" };

    const token = await Token.findOne({
      where: { access_token },
    });

    if (!token) throw { name: "invalid token" };

    const payload: jwtValue = verifyToken(token.access_token);

    const {
      id,
      email,
      username,
      isVerified,
      StoreId,
      role,
      point,
      experience,
      image,
    } = payload;

    req.user = {
      id,
      email,
      username,
      isVerified,
      StoreId,
      role,
      point,
      experience,
      image,
    };
    next();
  } catch (err) {
    next(err);
  }
};
