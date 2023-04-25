import { NextFunction, Request, Response } from "express";
import { Log } from "../models";

export const logging = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", async () => {
    await Log.create({
      path: req.originalUrl,
      UserId: req?.user?.id,
      method: req.method,
      statusCode: res.statusCode,
      origin: req.headers.origin,
      responseTime: parseInt(res.getHeaders()["x-response-time"] as string),
    });
  });

  next();
};
