import { multipleUserById, requestUser } from "../interfaces/user";
import { Db } from "../models";
import { QueryTypes } from "sequelize";

export default class UserService {
  public static async getMultipleUser(
    ids: number[],
    user: requestUser | null
  ): Promise<multipleUserById[]> {
    try {
      let query = `SELECT u."username" ,u."imageUrl" ,u."id" ,u."UUID" ,u."bio" `;

      if (user)
        query += `, CASE WHEN fu."FollowedUser" IS NOT NULL THEN true ELSE false END AS isFollowed `;

      query += `FROM "Users" u  `;

      if (user) query += `LEFT JOIN "FollowingUsers" fu ON u.id = fu."UserId" `;

      const placeHolder = ids
        .map((_: number, idx: number) => `$${idx + 1}`)
        .join(", ");

      query += `WHERE u.id IN (${placeHolder})`;

      const users = await Db.query<multipleUserById>(query, {
        type: QueryTypes.SELECT,
        bind: ids,
      });
      return users;
    } catch (err) {
      return [];
    }
  }
}
