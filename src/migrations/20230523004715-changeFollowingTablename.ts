import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.renameTable("Followings", "FollowingStores");
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.renameTable("FollowingStores", "Followings");
  },
};
