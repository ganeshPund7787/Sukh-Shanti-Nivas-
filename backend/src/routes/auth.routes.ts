import express, { NextFunction, Request, Response, Router } from "express";
import { check } from "express-validator";
import { userLogin } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/Auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({
      min: 6,
    }),
  ],
  userLogin
);

router.get(
  "/validate-token",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send({ _id: req._id });
    } catch (error: any) {
      next(error);
    }
  }
);
export default router;
