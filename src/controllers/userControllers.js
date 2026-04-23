import { AuthModel, UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const updateUserProfile = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) throw new Error("Unauthorized ,No token found");
    const UpdateProfile = req.body;
    const decoded = await jwt.verify(authHeader, process.env.JWT_SCRET_KEY);

    const findUser = await AuthModel.findOne({ _id: decoded.id });
    if (!findUser) throw new Error("Invalid token");

    const update = await UserModel.create({
      user_id: findUser._id,
      ...UpdateProfile,
    });
    res.status(200).json({
      status: true,
      message: "Successfully Updated Pofile",
      data: update,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { limit, page, sort } = req.query;
    const findUsers = await UserModel.find().limit(limit).skip(page).sort(sort);
    if (!findUsers) throw new Error("No User Found");
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: findUsers,
    });
  } catch (error) {
    next(error);
  }
};
