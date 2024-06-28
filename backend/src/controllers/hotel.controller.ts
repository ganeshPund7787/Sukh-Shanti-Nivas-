import { Request, Response, NextFunction } from "express";
import { Hotel } from "../models/hotel.model";

export const getMyHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find({ userId: req._id });
    res.json(hotels);
  } catch (error: any) {
    next(error);
  }
};
