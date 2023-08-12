import { Request, Response, NextFunction } from "express";
import { compare } from "../helpers/bcrypt";
import { User, Token } from "../models";
import { UserAttributes } from "../interfaces/model";
import { createToken } from "../helpers/jwt";
import { OAuth2Client, TokenPayload } from "google-auth-library";

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
        isVerified: (await user).isVerified,
        StoreId: (await user).StoreId,
        role: (await user).role,
        point: (await user).point,
        experience: (await user).exp,
        image: (await user).imageUrl,
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

  public static async googleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { google_token } = req.headers;

      const client = new OAuth2Client(
        process.env.GOOGLE_OAUTH_CLIENTID,
        process.env.GOOGLE_OAUTH_CLIENT_SECRET
      );

      const ticket = await client.verifyIdToken({
        idToken: google_token as string,
        audience: process.env.GOOGLE_OAUTH_CLIENTID,
      });

      const payload = ticket.getPayload() as TokenPayload;

      const { given_name, family_name, email } = payload;

      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: "OAUTH LOGIN",
          username: family_name ? `${given_name} ${family_name}` : given_name,
          fullName: family_name ? `${given_name} ${family_name}` : given_name,
          isVerified: true,
          phoneNumber: "000000000000",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
        StoreId: user.StoreId,
        role: user.role,
        point: user.point,
        experience: user.exp,
        image: user.imageUrl ?? "",
      });

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
