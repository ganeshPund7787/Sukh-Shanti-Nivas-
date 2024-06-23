import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error.Handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      _id: string;
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookie } = req.cookies;
    if (!cookie) {
      return next(errorHandler(400, "You should login first"));
    }

    const user = jwt.verify(cookie, process.env.JWT_SECREATE_KEY as string);
    req._id = (user as JwtPayload)._id;
    next();
  } catch (error: any) {
    console.log(`Error while auth : ${error.message}`);
  }
};
