import { Request, Response, NextFunction } from "express";
import { UserAttributes } from "../interfaces/model";
import { compare } from "../helpers/bcrypt";
import { User, Following, TopUp, Achievement } from "../models";
import { imagekit } from "../helpers/imagekit";
import { verifyToken } from "../helpers/jwt";
import fs from "fs";

export default class UserController {
  public static async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: Promise<UserAttributes[]> | any = await User.findAll({
        include: [{ model: Following }, { model: TopUp }],
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
        include: [{ model: Following }, { model: TopUp }],
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
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

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

      const payload = verifyToken(token);

      const user: Promise<UserAttributes> | any = await User.findOne({
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
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

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
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { StoreId } = req.headers;

      const { id } = req.user;

      const user = await User.update({ StoreId }, { where: { id } });

      if (!user) throw { name: "failed update" };

      res.status(201).json({ message: "success create store" });
    } catch (err) {
      next(err);
    }
  }
  //add verification method too soon
  public static async changePhoneNumber(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { phoneNumber } = req.body;

      const { id } = req.user;

      const user = await User.update({ phoneNumber }, { where: { id } });

      if (!user) throw { name: "failed update" };

      res.status(201).json({ message: "success update" });
    } catch (err) {
      next(err);
    }
  }

  public static async changeEmail(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      const { id } = req.user;

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
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { id },
        include: [
          { model: Following },
          { model: TopUp },
          { model: Achievement },
        ],
      });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public static async changeImg(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const { fileName } = req.file;

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
}
