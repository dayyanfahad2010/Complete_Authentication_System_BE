import express from "express";
import { getUsers, updateUserProfile } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);
userRoutes.put("/updateprofile", updateUserProfile);

export default userRoutes;
