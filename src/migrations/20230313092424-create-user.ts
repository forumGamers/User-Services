import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8, 16],
        },
      },

      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      imageUrl: {
        type: Sequelize.STRING,
        defaultValue: null,
      },

      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      StoreId: {
        type: Sequelize.INTEGER,
      },

      point: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      exp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable("Users");
  },
};
