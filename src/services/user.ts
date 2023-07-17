import { multipleUserById } from "../interfaces/user";
import { Db } from "../models";
import { QueryTypes } from "sequelize";

export default class UserService {
  public static async getMultipleUser(
    ids: number[]
  ): Promise<multipleUserById[]> {
    try {
      const placeHolder = ids
        .map((_: number, idx: number) => `$${idx + 1}`)
        .join(", ");

      const users = await Db.query<multipleUserById>(
        `SELECT u."username" ,u."imageUrl" ,u."id" ,u."UUID" FROM "Users" u WHERE u.id IN (${placeHolder})`,
        {
          type: QueryTypes.SELECT,
          bind: ids,
        }
      );
      return users;
    } catch (err) {
      return [];
    }
  }
}
