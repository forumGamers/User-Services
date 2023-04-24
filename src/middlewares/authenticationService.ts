import { Request, Response, NextFunction } from "express";
import { verifyServiceToken } from "../helpers/jwt";

export const ServiceAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token_service } = req.headers;

    if (!token_service) throw { name: "Forbidden" };

    const token = verifyServiceToken(token_service);

    const { id, path, origin } = token;

    req.service = {
      id,
      path,
      origin,
    };

    next();
  } catch (err) {
    next(err);
  }
};
