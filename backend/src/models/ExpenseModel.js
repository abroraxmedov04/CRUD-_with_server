import { Sequelize, Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class ExpenseModel extends Model {}

ExpenseModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: "expense",
    },
    date: {
      type: DataTypes.DATE,
    },
    category: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "expense",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);

await ExpenseModel.sync({ alter: true });
