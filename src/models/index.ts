"use strict";

import { Options, Sequelize } from "sequelize";
import User from "./user";
import FollowingStore from "./followingStore";
import FollowingUser from "./followinguser";
import Token from "./token";
import Log from "./log";
const config = require("../../config/config.json");
let sequelize: Sequelize;
import * as dotenv from "dotenv";
const production: string = process.env[config.use_env_variable] as string;
dotenv.config();

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    config.test.database,
    config.test.username,
    config.test.password,
    <Options>config.test
  );
} else if (
  process.env.NODE_ENV === "production" ||
  process.env[config.use_env_variable]
) {
  sequelize = new Sequelize(production, <Options>config.production);
} else {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    <Options>config.development
  );
}

let models = [User, FollowingStore, FollowingUser, Token, Log];
models.forEach((model) => model.initialize(sequelize));

User.hasMany(FollowingStore, { foreignKey: "UserId" });

User.hasMany(Token, { foreignKey: "UserId" });

User.hasMany(Log, { foreignKey: "UserId" });

User.belongsToMany(User, {
  foreignKey: "UserId",
  through: "FollowingUser",
  as: "followers",
});

User.belongsToMany(User, {
  foreignKey: "FollowedUser",
  through: "FollowingUser",
  as: "following",
});

FollowingStore.belongsTo(User, { foreignKey: "UserId" });

Token.belongsTo(User, { foreignKey: "UserId" });

Log.belongsTo(User, { foreignKey: "UserId" });

export {
  sequelize as Db,
  User,
  FollowingStore,
  FollowingUser,
  Token,
  Log,
};
