import { NextFunction, Request, Response } from "express";
import { Achievement } from "../models";

export default class Controller {
  public static async addAchievment(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { achievement } = req.headers;
      const { id } = req?.user;

      await Achievement.create({
        AchievementId: achievement,
        UserId: id,
      });

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
