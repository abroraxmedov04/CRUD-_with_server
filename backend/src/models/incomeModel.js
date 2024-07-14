import { Sequelize, Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class IncomeModel extends Model {}

IncomeModel.init(
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
      defaultValue: "income",
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
    tableName: "income",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);

await IncomeModel.sync({ alter: true });
