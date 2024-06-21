import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { errorHandler } from "../utils/error.Handler";
import jwt from "jsonwebtoken";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isUserExist = await User.findOne({ email: req.body.email });

    if (isUserExist) {
      return next(errorHandler(400, "User already exist"));
    }

    const newUser = new User(req.body);
    await newUser.save();

    const cookie = jwt.sign(
      { _id: newUser.id },
      process.env.JWT_SECREATE_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("cookie", cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      .status(200)
      .json("ok");
  } catch (error: any) {
    next(error);
    console.log(`Error while register user ${error.message}`);
  }
};
