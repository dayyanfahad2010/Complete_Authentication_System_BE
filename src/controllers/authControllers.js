import mongoose from "mongoose";
import { AuthModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) throw new Error("All Fields Are Required");
    const user = await AuthModel.create({
      userName: userName,
      email: email,
      password: password,
    });

    res.status(200).json({
      status: true,
      message: "User Signup Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All Fields Are Required");

    const validateEmail = await AuthModel.findOne({ email: email });
    if (!validateEmail) throw new Error("User not Found");
    if (validateEmail.password != password) throw new Error("Invalid Credentials");
    const token = jwt.sign(
      { id: validateEmail._id, email: validateEmail.email },
      process.env.JWT_SCRET_KEY,
    );

    res.status(200).json({
      status: true,
      message: "User logged In Successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
