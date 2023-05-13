import { NextFunction, Request, Response } from "express";
import Encryption from "../helpers/encryption";

export const queryFilter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { query } = req;

    for (const key in query) {
      if (
        !key.toLowerCase().includes("password") &&
        Encryption.validateChar(query[key] as string)
      )
        throw {
          name: "invalid input",
          msg: `${key} is not allowed contains symbol`,
        };
    }

    next();
  } catch (err) {
    next(err);
  }
};
