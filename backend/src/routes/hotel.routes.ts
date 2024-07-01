import express from "express";
import { searchHotels } from "../controllers/hotel.controller";

const router = express.Router();

router.get("/search", searchHotels);

export default router;
