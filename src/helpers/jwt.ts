import { JwtPayload, Secret, verify, sign } from "jsonwebtoken";
export const secret: Secret = process.env.secret as Secret;

export const createToken = (payload: object): string => sign(payload, secret);

export const verifyToken = (token: string): JwtPayload =>
  verify(token, secret) as JwtPayload;
