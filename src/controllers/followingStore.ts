import { Request, Response, NextFunction } from "express";
import { FollowingStore } from "../models";

export default class FollowingStoreController {
  public static async CountStoreFollower(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { storeId } = req.params;

      const data = await FollowingStore.count({
        where: {
          StoreId: storeId,
        },
      });

      if (data < 1) throw { name: "Data not found" };

      res.status(200).json({ count: data });
    } catch (err) {
      next(err);
    }
  }

  public static async FollowStore(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { storeId } = req.params;

      const { id } = req.user;

      const data = await FollowingStore.findOne({
        where: {
          UserId: id,
          StoreId: storeId,
        },
      });

      if (data) throw { name: "Data exist" };

      await FollowingStore.create({
        UserId: id,
        StoreId: storeId,
      });

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
