import { Request, Response, NextFunction } from "express";
import { compare } from "../helpers/bcrypt";
import { User, Token } from "../models";
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
        StoreId: (await user).StoreId,
        role: (await user).role,
        point: (await user).point,
        experience: (await user).exp,
      };

      const access_token = createToken(payload);

      await Token.create({
        access_token,
        role: "User",
        UserId: user.id,
      });

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

  public static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { access_token } = req.headers;

      if (!access_token) throw { name: "Invalid token" };

      await Token.destroy({ where: { access_token } });

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }

  public static async getResetPasswordToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "Data not found" };

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      };

      const token = createToken(payload);

      await Token.create({
        access_token: token,
        UserId: user.id,
        role: "user",
      });

      res.status(200).json(token);
    } catch (err) {
      next(err);
    }
  }

  public static async ChangeForgetPass(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.user;

      const { access_token } = req.headers;

      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword)
        throw {
          name: "Bad Request",
          msg: "Password must same as confirm password",
        };

      await User.update({ password }, { where: { id } });

      await Token.destroy({ where: { access_token } });

      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}
