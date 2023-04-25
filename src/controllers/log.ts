import { NextFunction, Request, Response } from "express";
import LogService from "../services/log";
import { LogAttributes } from "../interfaces/model";

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

  public static async createManyLogs(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const logs: LogAttributes[] = req.body;

      const data = logs.map((log) => {
        return {
          ...log,
          UserId: req.user.id,
        };
      });

      const { status, message } = await LogService.createMany(data);

      if (!status) throw { name: message };

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
