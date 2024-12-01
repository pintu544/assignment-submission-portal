import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
