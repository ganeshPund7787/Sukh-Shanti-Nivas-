import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { errorHandler } from "../utils/error.Handler";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ success: false, message: error.array() });
  }
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
      .json({
        success: true,
        message: "User register successfully",
      });
  } catch (error: any) {
    next(error);
    console.log(`Error while register user ${error.message}`);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) return next(errorHandler(400, "User is not exist"));

    const validPassword = bcryptjs.compareSync(password, isUserExist.password);

    if (!validPassword) {
      return next(errorHandler(401, "incorrect email & password"));
    }

    const cookie = jwt.sign(
      { _id: isUserExist.id },
      process.env.JWT_SECREATE_KEY as string
    );

    res
      .cookie("cookie", cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      })
      .status(200)
      .json({
        userId: isUserExist._id,
      });
  } catch (error: any) {
    next(error);
    console.log(`Error while login ${error.message}`);
  }
};

export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .clearCookie("cookie")
      .json({ success: true, message: "User logout successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req._id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(errorHandler(400, "User not found"));
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "something went wrong"));
  }
};
