import express from "express";
import { isAuthenticated } from "../middleware/Auth";
import { myBookigs } from "../controllers/my-booking.controller";

const router = express.Router();

router.get("/", isAuthenticated, myBookigs);

export default router;
