import { Request, Response, NextFunction } from "express";
import { TopUpAttributes, UserAttributes } from "../interfaces/model";
import { TopUp, User } from "../models";

export default class TopUpController {
  public static async getAllData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: Promise<TopUpAttributes[]> | any = await TopUp.findAll();

      if (!data || (await data).length < 1) throw { name: "Data not found" };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async getMyData(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const data: Promise<TopUpAttributes[]> | any = await TopUp.findAll({
        where: { id },
      });

      if (!data || (await data).length < 1) throw { name: "Data not found" };

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async purchase(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const { price } = req.body;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
      });

      const balance = user.balance - price;

      const updated = await User.update({ balance }, { where: { id } });

      if (!updated) throw { name: "payment error" };

      res.status(201).json({ message: "success purchase" });
    } catch (err) {
      next(err);
    }
  }
}
