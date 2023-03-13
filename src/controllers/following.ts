import { Request, Response, NextFunction } from "express";
import { FollowingAttributes } from "../interfaces/model";
import { Following } from "../models";
import { Op } from "sequelize";

export default class FollowingController {
  public static async getAllData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const following:
        | Promise<Array<FollowingAttributes>>
        | any = await Following.findAll();

      if (!following || (await following).length < 1)
        throw { name: "Data not found" };

      res.status(200).json(following);
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

      const followings:
        | Promise<Array<FollowingAttributes>>
        | any = await Following.findAll({ where: { id } });

      if ((await followings).length < 1 || !followings)
        throw { name: "Data not found" };

      res.status(200).json(followings);
    } catch (err) {
      next(err);
    }
  }

  public static async follow(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: StoreId } = req.params;
      const { id: UserId } = req.user;

      const follow:
        | Promise<FollowingAttributes>
        | any = await Following.findOne({
        where: {
          UserId,
          StoreId,
        },
      });

      if (await follow) throw { name: "Data exist" };

      await Following.create({
        UserId,
        StoreId,
      });

      res.status(201).json({ message: "success create" });
    } catch (err) {
      next(err);
    }
  }

  public static async delete(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const following:
        | Promise<FollowingAttributes>
        | any = await Following.findOne({
        where: { id },
      });

      if (!following) throw { name: "Data not found" };

      await Following.destroy({ where: id });

      res.status(200).json({ message: "success delete" });
    } catch (err) {
      next(err);
    }
  }

  public static async getMutual(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const { mutual } = req.query;

      const result:
        | Promise<Array<FollowingAttributes>>
        | any = await Following.findAll({
        where: {
          [Op.or]: [{ id }, { id: mutual }],
        },
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public static async getStoreFollowData(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: StoreId } = req.params;

      const follows:
        | Promise<FollowingAttributes[]>
        | any = await Following.findAll({
        where: { StoreId },
      });

      if ((await follows).length < 1) throw { name: "Data not found" };

      res.status(200).json(follows);
    } catch (err) {
      next(err);
    }
  }
}
