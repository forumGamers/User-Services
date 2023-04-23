import { Token } from "../models";

export default class TokenService {
  public static async deleteAll(): Promise<boolean> {
    try {
      await Token.destroy();
      return true;
    } catch (err) {
      return false;
    }
  }
}
