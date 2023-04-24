import { Sequelize, Model, DataTypes } from "sequelize";
import User from "./user";

export default class Log extends Model {
  public static associate(models: any) {
    Log.belongsTo(models.User, { foreignKey: "UserId" });
  }

  public path!: string;
  public method!: string;
  public UserId!: number;
  public statusCode!: number;
  public responseTime!: number;
  public origin!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        UserId: {
          type: DataTypes.INTEGER,
          references: {
            model: {
              tableName: "Users",
            },
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        method: {
          type: DataTypes.ENUM("GET", "POST", "PATCH", "DELETE", "PUT"),
          allowNull: false,
        },
        statusCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        responseTime: {
          type: DataTypes.INTEGER,
        },
        origin: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Log",
      }
    );
  }
}
