import { Request, Response, NextFunction } from "express";
import { Token, User } from "../models";
import GlobalHelper from "../helpers/global";
import { createServiceToken } from "../helpers/jwt";

export default class Controller {
  public static async getListLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit } = req.query;

      let pg = parseInt(page as string) ? parseInt(page as string) : 1;
      let lmt = parseInt(limit as string) ? parseInt(limit as string) : 10;

      const data = await Token.findAndCountAll({
        include: [{ model: User }],
        offset: (pg - 1) * lmt,
        limit: lmt,
      });

      if (!data.count) throw { name: "Data not found" };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async createTokenService(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const path = GlobalHelper.arrayInput(req.body.path);
      const { origin } = req.headers;

      if (!path.length || !origin) throw { name: "invalid input" };

      const payload = {
        ...req.user,
        origin,
        path,
      };

      const token = createServiceToken(payload);

      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
