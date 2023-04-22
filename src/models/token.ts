import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";
import User from "./user";

export default class Achievement extends Model {
  public static associate(models: any) {
    Achievement.belongsTo(models.User, { foreignKey: "UserId" });
  }

  public access_token!: string;
  public role!: string;
  public UserId!: number;

  public addUser!: BelongsToCreateAssociationMixin<User>;
  public addUsers!: BelongsToGetAssociationMixin<User>;
  public createUser!: BelongsToCreateAssociationMixin<User>;
  public getUsers!: BelongsToGetAssociationMixin<User>;
  public hasUser!: BelongsToGetAssociationMixin<User>;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        access_token: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
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
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Token",
      }
    );
  }
}
