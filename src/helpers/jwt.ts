import { JwtPayload, Secret, verify, sign } from "jsonwebtoken";
export const secret: Secret = process.env.secret as Secret;
export const SERVICE_SECRET: Secret = process.env.SERVICE_SECRET as Secret;

export const createToken = (payload: object): string => sign(payload, secret);

export const verifyToken = (token: string): JwtPayload =>
  verify(token, secret) as JwtPayload;

export const verifyServiceToken = (token: string): JwtPayload =>
  verify(token, SERVICE_SECRET) as JwtPayload;

export const createServiceToken = (payload: object): string =>
  sign(payload, SERVICE_SECRET, { expiresIn: "1m" });
