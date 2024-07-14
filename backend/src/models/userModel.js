import { Sequelize, Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class UserModel extends Model {}

UserModel.init(
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    frist_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      unique: true,
    },
    age: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "users",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);

await UserModel.sync({ alter: true });
