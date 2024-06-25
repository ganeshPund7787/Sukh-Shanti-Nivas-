import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";

mongoose
  .connect(process.env.MONGO_URI as string, { dbName: "User" })
  .then(() =>
    console.log(`Databse connected successfully`)
  )
  .catch((err) => console.log(`Error While database connection ${err}`));

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(errorMiddleware);
app.listen(4999, () => {
  console.log(`Port in running on 4999`);
});
