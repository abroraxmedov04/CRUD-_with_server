import express from "express";
import cors from "cors";

import { newSequelize } from "./config/index.js";
import transactions from "./routes/transactions.js";
import router from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cors());

try {
  await newSequelize.authenticate();
  console.log("Connection has been established successfully");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(transactions);
app.use(router);

app.all("/*", (req, res, next) => {
  res.status(500).json({
    message: req.url + " is not found",
  });
});

app.listen(9090, console.log(9090));
