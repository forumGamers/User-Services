import { Request, Response, NextFunction } from "express";

export const authorizeAdmin = (
  req: Request | any,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { role } = req.user;

    if (role !== "Admin") throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};
