import { NextFunction, Request, Response } from "express";
import LogService from "../services/log";

export default class Controller {
  public static async createLog(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: UserId } = req.user;
      const { path, method, statusCode, responseTime, origin } = req.body;

      const { status, message } = await LogService.create({
        path,
        UserId,
        method,
        statusCode,
        responseTime,
        origin,
      });

      if (!status) throw { name: message };

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
