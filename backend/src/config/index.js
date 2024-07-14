import sequelize from "sequelize";

const newSequelize = new sequelize(
  "postgres://jwxnwmru:5cokV1CV7fhu-mnO4sPiEBsx4JukCvW-@lallah.db.elephantsql.com/jwxnwmru",
  { logging: false }
);


export { newSequelize };
