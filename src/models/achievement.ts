import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import User from "./user";

export default class Achievement extends Model {
  public static associate(models: any) {
    Achievement.belongsTo(models.User, { foreignKey: "UserId" });
  }

  public AchievementId!: string;
  public UserId!: number;

  public addUser!: BelongsToManyAddAssociationMixin<User, number>;
  public addUsers!: BelongsToManyAddAssociationsMixin<User, number>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public createUser!: BelongsToManyCreateAssociationMixin<User>;
  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
  public hasUsers!: BelongsToManyHasAssociationsMixin<User, number>;
  public removeUser!: BelongsToManyRemoveAssociationMixin<User, number>;
  public removeUsers!: BelongsToManyRemoveAssociationsMixin<User, number>;
  public setUsers!: BelongsToManySetAssociationsMixin<User, number>;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        AchievementId: {
          type: DataTypes.STRING,
          allowNull:false
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
      },
      {
        sequelize,
        modelName: "Achievement",
      }
    );
  }
}
