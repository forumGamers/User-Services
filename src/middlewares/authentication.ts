import { Request, Response, NextFunction } from "express";
import { Token } from "../models";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../helpers/jwt";

export const authentication = async (
  req: Request | any,
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

    const payload: JwtPayload = verifyToken(token.access_token);

    const {
      id,
      email,
      username,
      fullName,
      isVerified,
      phoneNumber,
      StoreId,
      role,
      point,
      exp,
    } = payload;

    req.user = {
      id,
      email,
      username,
      fullName,
      isVerified,
      phoneNumber,
      StoreId,
      role,
      point,
      exp,
    };
    next();
  } catch (err) {
    next(err);
  }
};
