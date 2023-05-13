import { NextFunction, Request, Response } from "express";
import Encryption from "../helpers/encryption";

export const bodyDecryption = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { body } = req;

    const decryptedBody: any = {};

    for (const key in body) {
      const value = body[key];

      if (typeof value === "string" && value.includes(":")) {
        const decrypt = Encryption.decrypt(value);

        if (
          !key.toLowerCase().includes("password") &&
          Encryption.validateChar(decrypt)
        )
          throw {
            name: "invalid input",
            msg: `${key} is not allowed contains symbol`,
          };

        decryptedBody[key] = decrypt;
      }
    }

    req.body = decryptedBody;

    next();
  } catch (err) {
    next(err);
  }
};
