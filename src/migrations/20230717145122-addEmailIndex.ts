import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addIndex("Users", ["email"], {
      unique: true,
      type: "UNIQUE",
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeIndex("Users", ["email"]);
  },
};
