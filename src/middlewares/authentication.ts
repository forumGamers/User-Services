import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../helpers/jwt";
import { UserAttributes } from "../interfaces/model";

export const authentication = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "invalid token" };

    const payload: JwtPayload | any = verifyToken(access_token);

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

    const user: UserAttributes | any = await User.findOne({ where: { id } });

    if (!user) throw { name: "invalid token" };

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
