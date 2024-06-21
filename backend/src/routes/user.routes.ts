import express, { Router } from "express";
import { userRegister } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", userRegister);

export default router;
