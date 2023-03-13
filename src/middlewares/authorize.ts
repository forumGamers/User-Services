import { Request, Response, NextFunction } from "express";

export const authorize = (
  req: Request | any,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { isVerified } = req.user;

    if (!isVerified) throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};
