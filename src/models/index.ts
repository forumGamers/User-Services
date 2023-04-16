"use strict";

import { Options, Sequelize } from "sequelize";
import User from "./user";
import Following from "./following";
import TopUp from "./topup";
import Achievement from "./achievement";
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

let models = [User, Following, TopUp, Achievement];
models.forEach((model) => model.initialize(sequelize));

User.hasMany(Following, { foreignKey: "UserId" });

User.hasMany(TopUp, { foreignKey: "UserId" });

User.hasMany(Achievement, { foreignKey: "UserId" });

Following.belongsTo(User, { foreignKey: "UserId" });

TopUp.belongsTo(User, { foreignKey: "UserId" });

Achievement.belongsTo(User, { foreignKey: "UserId" });

export { sequelize as Db, User, Following, TopUp, Achievement };
