import express, { Router } from "express";
import { check } from "express-validator";
import { userLogin, validateToken } from "../controllers/user.controller";
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

router.get("/validate-token", isAuthenticated, validateToken);
export default router;
