import { requestUser } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: requestUser | null;
    }
  }
}
