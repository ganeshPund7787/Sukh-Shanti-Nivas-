import mongoose from "mongoose";
import { Hoteltype } from "../shared/types";

const hotelSchema = new mongoose.Schema<Hoteltype>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: Array, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: Array, required: true }],
    lastUpdated: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model<Hoteltype>("Hotel", hotelSchema);
