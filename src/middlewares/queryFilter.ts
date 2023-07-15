import { NextFunction, Request, Response } from "express";
import Encryption from "../helpers/encryption";

export const queryFilter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { query } = req;

    const filteredQuery: any = {};

    for (const key in query)
      filteredQuery[key] = Encryption.filterQuery(query[key] as string);

    req.query = filteredQuery;

    next();
  } catch (err) {
    next(err);
  }
};
