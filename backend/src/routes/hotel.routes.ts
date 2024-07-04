import express from "express";
import {
  getHotel,
  readyForPayment,
  searchHotels,
} from "../controllers/hotel.controller";
import { param } from "express-validator";
import { isAuthenticated } from "../middleware/Auth";

const router = express.Router();

router.get("/search", searchHotels);

router.get("/:id", [
  param("id").notEmpty().withMessage("Hotel ID is required"),
  getHotel,
]);

router.post(
  "/:hotelId/bookings/payment-intent",
  isAuthenticated,
  readyForPayment
);

export default router;
