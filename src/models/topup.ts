import {
  Sequelize,
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
  Model,
} from "sequelize";
import User from "./user";

export default class TopUp extends Model {
  public static associate(models: any) {
    TopUp.belongsTo(models.User, { foreignKey: "UserId" });
  }

  public amount!: number;
  public UserId!: number;
  public status!: string;

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
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "amount is required",
            },
            notNull: {
              msg: "amount is required",
            },
          },
        },
        UserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Users",
            },
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: "Pending",
        },
      },
      {
        sequelize,
        modelName: "TopUp",
      }
    );
  }
}
