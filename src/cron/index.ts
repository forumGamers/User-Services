import { schedule } from "node-cron";
import TokenService from "../services/token";

export default class Cron {
  public static async deleteToken(): Promise<void> {
    try {
      schedule("* 02 * * *", async () => {
        await TokenService.deleteAll();
      });
    } catch (err) {
      console.log(err);
    }
  }
}
