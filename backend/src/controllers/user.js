import jwt from "../lib/jwt.js";
import { UserModel } from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { last_name, frist_name, email, password, age } = req.body;

    if (!last_name || !frist_name || !email || !password || !age) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (age < 0 || !age === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const data = await UserModel.create({
      last_name,
      frist_name,
      email,
      password,
      age,
    });

    return res.status(200).send({
      message: "success",
      status: 200,
      token: jwt.sing({ password, email }),
    });
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password???" });
    }

    const data = await UserModel.findAll();

    const newData = await data.find(
      (e) => e.password == password && e.email == email
    );

    if (!newData) {
      return res?.status(400).send({
        status: 400,
        message: "User is not found",
      });
    }
    return res.status(200).send({
      message: "success",
      status: 200,
      token: jwt.sing({ password, email }),
    });
  } catch (error) {
    return res?.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};
