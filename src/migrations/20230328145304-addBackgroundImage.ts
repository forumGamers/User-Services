import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn("Users", "backgroundImage", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn("Users", "backgroundImage");
  },
};
