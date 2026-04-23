import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(errorMiddleware);
