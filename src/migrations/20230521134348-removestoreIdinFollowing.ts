import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn("Followings", "StoreId");
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn("Followings", "StoreId", {
      type: Sequelize.INTEGER,
    });
  },
};
