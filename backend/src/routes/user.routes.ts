import express, { Router } from "express";
import { getUser, userRegister } from "../controllers/user.controller";
import { check } from "express-validator";
import { isAuthenticated } from "../middleware/Auth";

const router = express.Router();

router.get("/me", isAuthenticated, getUser);

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "last Name is required").isString(),
    check("email", "email is required").isEmail(),
    check("password", "password with 6 or more character required").isLength({
      min: 6,
    }),
  ],

  userRegister
);

export default router;
