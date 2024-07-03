import express from "express";
import { getHotel, searchHotels } from "../controllers/hotel.controller";
import { param } from "express-validator";

const router = express.Router();

router.get("/search", searchHotels);

router.get("/:id", [
  param("id").notEmpty().withMessage("Hotel ID is required"),
  getHotel,
]);

export default router;
