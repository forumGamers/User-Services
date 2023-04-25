import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn("Users", "UUID", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn("Users", "UUID");
  },
};
