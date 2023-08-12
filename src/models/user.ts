import {
  Sequelize,
  DataTypes,
  Model,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import FollowingStore from "./followingStore";
import { UserAttributes } from "../interfaces/model";
import { hash } from "../helpers/bcrypt";
import { v4 } from "uuid";

export default class User extends Model<UserAttributes, any> {
  public static associate(models: any) {
    User.hasMany(models.FollowingStore, { foreignKey: "UserId" });
    User.hasMany(models.Token, { foreignKey: "UserId" });
    User.hasMany(models.Log, { foreignKey: "UserId" });
  }

  public id!: number;
  public fullName!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public isVerified!: boolean;
  public balance!: number;
  public imageUrl?: string;
  public phoneNumber!: string;
  public StoreId?: number;
  public role!: string;
  public point!: number;
  public exp!: number;
  public UUID!: string;

  //   class association methods
  public addFollowing!: HasManyAddAssociationMixin<
    typeof FollowingStore,
    number
  >;
  public addFollowings!: HasManyAddAssociationsMixin<
    typeof FollowingStore,
    number
  >;
  public countFollowings!: HasManyCountAssociationsMixin;
  public createFollowings!: HasManyCreateAssociationMixin<FollowingStore>;
  public getFollowings!: HasManyGetAssociationsMixin<typeof FollowingStore>;
  public hasFollowing!: HasManyHasAssociationMixin<
    typeof FollowingStore,
    number
  >;
  public hasFollowings!: HasManyHasAssociationsMixin<
    typeof FollowingStore,
    number
  >;
  public removeFollowing!: HasManyRemoveAssociationMixin<
    typeof FollowingStore,
    number
  >;
  public removeFollowings!: HasManyRemoveAssociationsMixin<
    typeof FollowingStore,
    number
  >;
  public setFollowings!: HasManySetAssociationsMixin<
    typeof FollowingStore,
    number
  >;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "fullname is required",
            },
            notNull: {
              msg: "fullname is required",
            },
          },
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            name: "username unique",
            msg: "username is already use",
          },
          validate: {
            notEmpty: {
              msg: "username is required",
            },
            notNull: {
              msg: "username is required",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            name: "email unique",
            msg: "email is already use",
          },
          validate: {
            notEmpty: {
              msg: "email is required",
            },
            notNull: {
              msg: "email is required",
            },
            isEmail: {
              msg: "invalid email format",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [8, 16],
              msg: "password minimum characters are 8",
            },
            notNull: {
              msg: "password is required",
            },
            notEmpty: {
              msg: "password is required",
            },
          },
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        balance: {
          type: DataTypes.NUMBER,
          defaultValue: 0,
        },
        imageUrl: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "phoneNumber is required",
            },
            notEmpty: {
              msg: "phoneNumber is required",
            },
          },
        },
        StoreId: {
          type: DataTypes.NUMBER,
        },
        role: {
          type: DataTypes.STRING,
        },
        point: {
          type: DataTypes.NUMBER,
          defaultValue: 0,
        },
        exp: {
          type: DataTypes.NUMBER,
          defaultValue: 0,
        },
        UUID: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          unique: {
            name: "UUID is unique",
            msg: "UUID is unique",
          },
        },
      },
      {
        sequelize,
        modelName: "User",
        hooks: {
          beforeCreate: (user: User, Options: any): HookReturn => {
            user.password = hash(user.password);
            if (!user.role) {
              user.role = "user";
            } else if (user.role === "admin") {
              user.isVerified = true;
            }
            user.UUID = v4();
          },
          beforeUpdate: (user: User, Options: any): HookReturn => {
            user.password = hash(user.password);
          },
        },
        indexes: [
          {
            unique: true,
            fields: ["email"],
            type: "UNIQUE",
          },
        ],
      }
    );
  }
}
