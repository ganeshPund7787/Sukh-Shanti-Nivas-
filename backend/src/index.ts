import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRouter from "./routes/my-hotels.routes";
import HotelRouter from "./routes/hotel.routes";
import BookigRouter from "./routes/my-bookings.routes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREATE,
});

mongoose
  .connect(process.env.MONGO_URI as string, { dbName: "User" })
  .then(() => console.log(`Databse connected successfully`))
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

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/my-hotels", myHotelRouter);
app.use("/api/hotels", HotelRouter);
app.use("/api/my-bookings", BookigRouter);


app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use(errorMiddleware);
app.listen(4999, () => {
  console.log(`Port in running on 4999`);
});
