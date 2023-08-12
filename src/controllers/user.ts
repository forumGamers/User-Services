import { Request, Response, NextFunction } from "express";
import { UserAttributes } from "../interfaces/model";
import { compare } from "../helpers/bcrypt";
import { User, FollowingStore } from "../models";
import { imagekit } from "../helpers/imagekit";
import { verifyToken } from "../helpers/jwt";
import fs from "fs";
import UserService from "../services/user";
import { requestUser } from "../interfaces/user";

export default class UserController {
  public static async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: Promise<UserAttributes[]> | any = await User.findAll({
        include: [{ model: FollowingStore }],
      });

      if (!users || (await users).length < 1) throw { name: "Data not found" };

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  public static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
        include: [{ model: FollowingStore }],
      });

      if (!user) throw { name: "Data not found" };

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
      });

      if (!user) throw { name: "Data not found" };

      await User.destroy({
        where: { id },
      });

      res.status(200).json({ message: "success delete user" });
    } catch (err) {
      next(err);
    }
  }

  public static async changeUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user as requestUser;

      const { username } = req.body;

      if (!username)
        throw { name: "invalid input", msg: "invalid username input" };

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { username },
      });

      if ((await user) || (await user).username === username)
        throw { name: "invalid input", msg: "username is already use" };

      await User.update({ username }, { where: { id } });

      res.status(201).json({ message: "success change username" });
    } catch (err) {
      next(err);
    }
  }

  public static async verify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token } = req.query;

      const payload = verifyToken(token as string);

      const user = await User.findOne({
        where: { id: payload.id },
      });

      if (!user) throw { name: "Data not found" };

      const isVerified: boolean = true;

      await User.update({ isVerified }, { where: { id: payload.id } });

      res.status(201).json({ message: "verified" });
    } catch (err) {
      next(err);
    }
  }

  public static async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user as requestUser;

      const { password, currentPassword } = req.body;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
      });

      const validate = compare(currentPassword, (await user).password);

      if (!validate)
        throw { name: "invalid input", msg: "password is not match" };

      await User.update({ password }, { where: { id } });

      res.status(201).json({ message: "success change password" });
    } catch (err) {
      next(err);
    }
  }

  public static async createStore(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { storeid } = req.headers as Record<string, string>;

      const { id } = req.user as requestUser;

      const resp = await User.update(
        { StoreId: Number(storeid) },
        { where: { id } }
      );

      if (resp[0] === 0) throw { name: "failed update" };

      res.status(201).json({ message: "success create store" });
    } catch (err) {
      next(err);
    }
  }
  //add verification method too soon
  public static async changePhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body;

      const { id } = req.user as requestUser;

      const user = await User.update({ phoneNumber }, { where: { id } });

      if (!user) throw { name: "failed update" };

      res.status(201).json({ message: "success update" });
    } catch (err) {
      next(err);
    }
  }

  public static async changeEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      const { id } = req.user as requestUser;

      const user = await User.update(
        { email, isVerified: false },
        { where: { id } }
      );

      if (!user) throw { name: "failed update" };

      res.status(201).json({ message: "success change email" });
    } catch (err) {
      next(err);
    }
  }

  public static async getMyData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user as requestUser;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
        include: [{ model: FollowingStore }],
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public static async changeImg(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user as requestUser;

      const { fileName } = req?.file as any;

      const uploadImage = fs.readFileSync(`./uploads/${fileName}`);

      const result = await imagekit.upload({
        file: uploadImage,
        fileName,
      });

      const resp = await User.update(
        { imageUrl: result.url },
        { where: { id } }
      );

      if (resp[0] === 0) throw { name: "invalid input", msg: "Error Upload" };

      res.status(201).json({ message: "success change image" });
    } catch (err) {
      next(err);
    }
  }

  public static async GetMultipleUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.query.id as string;

      if (!id) throw { name: "Bad Request", msg: "query id is required" };

      if (id.length > 1 && !id.includes(","))
        throw { name: "Bad Request", msg: "Invalid format" };

      const data: number[] = [];

      id.replace(/\./g, ",")
        .split(",")
        .map(Number)
        .filter((el: number | null) => !isNaN(el as number))
        .forEach((el) => {
          if (!data.includes(el)) data.push(el);
        });

      if (data.length > 25) throw { name: "Data limit exceeded" };

      const users = await UserService.getMultipleUser(data, req.user);

      if (!users.length) throw { name: "Data not found" };

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}
