import { Request, Response, NextFunction } from "express";
import { compare } from "../helpers/bcrypt";
import { User } from "../models";
import { UserAttributes } from "../interfaces/model";
import { createToken } from "../helpers/jwt";

export default class AuthController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user: Promise<UserAttributes> | any = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "invalid credentials" };

      const validate: boolean = compare(password, (await user).password);

      if (!validate) throw { name: "invalid credentials" };

      const payload = {
        id: (await user).id,
        email: (await user).email,
        username: (await user).username,
        fullName: (await user).fullName,
        isVerified: (await user).isVerified,
        phoneNumber: (await user).phoneNumber,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { fullName, username, email, password, phoneNumber } = req.body;

      const data = await User.create({
        fullName,
        username,
        email,
        password,
        phoneNumber,
        role: "user",
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  public static async registerNewAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { fullName, username, email, password, phoneNumber } = req.body;

      await User.create({
        fullName,
        username,
        email,
        password,
        phoneNumber,
        role: "admin",
      });

      res.status(201).json({ message: "success create" });
    } catch (err) {
      next(err);
    }
  }
}