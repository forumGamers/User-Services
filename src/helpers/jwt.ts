import { JwtPayload, Secret, verify, sign } from "jsonwebtoken";
export const secret: Secret = process.env.secret as Secret;
export const SERVICE_SECRET: Secret = process.env.SERVICE_SECRET as Secret;

export interface jwtValue extends JwtPayload {
  id: number;
  email: string;
  username: string;
  isVerified: boolean;
  StoreId: number;
  role: "admin" | "user";
  point: number;
  experience: number;
  image: string | undefined;
}

export const createToken = (payload: object): string => sign(payload, secret);

export const verifyToken = (token: string): jwtValue =>
  verify(token, secret) as jwtValue;

export const verifyServiceToken = (token: string): jwtValue =>
  verify(token, SERVICE_SECRET) as jwtValue;

export const createServiceToken = (payload: object): string =>
  sign(payload, SERVICE_SECRET, { expiresIn: "1m" });
