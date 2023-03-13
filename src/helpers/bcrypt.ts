import { hashSync, compareSync } from "bcryptjs";

export const hash = (password: string) => hashSync(password, 10);

export const compare = (password: string, hashPassword: string | any) =>
  compareSync(password, hashPassword);
