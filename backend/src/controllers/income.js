import { IncomeModel } from "../models/incomeModel.js";

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    const data = await IncomeModel.create({
      title,
      amount,
      category,
      description,
      date,
    });
    return res.status(200).send({
      message: "Income Added",
      status: 200,
      data: [data],
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getIncomes = async (req, res) => {
  try {
    const data = await IncomeModel.findAll();
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await IncomeModel.destroy({
      where: {
        id: id,
      },
    });
    if (data == 0) {
      return res.status(400).send({
        status: 400,
        message: "Bunday id income yo'q",
      });
    }

    return res.status(200).send({
      status: 200,
      message: "Income delete success",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { deleteIncome, getIncomes, addIncome };
