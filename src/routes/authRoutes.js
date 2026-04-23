import express from "express";
import { login, signUp } from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);

export default authRoutes;
