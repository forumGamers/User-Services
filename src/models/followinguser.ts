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

export default class FollowingUser extends Model {
  public static associate(models: any) {
    FollowingUser.belongsTo(models.User, { foreignKey: "UserId" });
  }

  public UserId!: number;
  public FollowedUser!: number;

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
        FollowedUser: {
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
        modelName: "FollowingUser",
      }
    );
  }
}
