import express, { Router } from "express";
import { check } from "express-validator";
import { userLogin } from "../controllers/user.controller";

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

export default router;
