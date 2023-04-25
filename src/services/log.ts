import GlobalHelper from "../helpers/global";
import { LogAttributes } from "../interfaces/model";
import { serviceResponse } from "../interfaces/service";
import { Log } from "../models";

export default class LogService {
  public static async create(input: LogAttributes): Promise<serviceResponse> {
    try {
      const { path, UserId, method, statusCode, responseTime, origin } = input;

      await Log.create({
        path,
        UserId,
        method,
        statusCode,
        responseTime,
        origin,
      });

      return GlobalHelper.successService("success");
    } catch (err) {
      return GlobalHelper.errorService(err);
    }
  }

  public static async createMany(
    input: LogAttributes[]
  ): Promise<serviceResponse> {
    try {
      await Log.bulkCreate(input as any);
      return GlobalHelper.successService("success");
    } catch (err) {
      return GlobalHelper.errorService(err);
    }
  }
}
