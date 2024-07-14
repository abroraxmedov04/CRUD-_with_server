import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  getExpense,
} from "../controllers/expense.js";
import { addIncome, deleteIncome, getIncomes } from "../controllers/income.js";
import chektoken from "../middlewares/chektoken.js";
const router = Router();

router.post("/add-income", chektoken, addIncome);
router.get("/get-incomes", chektoken, getIncomes);
router.delete("/delete-income/:id", chektoken, deleteIncome);
router.post("/add-expense", chektoken, addExpense);
router.get("/get-expenses", chektoken, getExpense);
router.delete("/delete-expense/:id", chektoken, deleteExpense);

export default router;
