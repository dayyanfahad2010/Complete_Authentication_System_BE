import express from "express";
import { forgot_password, login, reset_password, signUp, verify_otp } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/verify-otp", verify_otp);
authRoutes.post("/forgot_password", forgot_password);
authRoutes.post("/reset_password", reset_password);

export default authRoutes;
