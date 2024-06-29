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

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id.toString();
    const hotel = await Hotel.find({
      _id: id,
      userId: req._id,
    });
    return res.json(hotel);
  } catch (error) {
    next(error);
    console.log(`Error while updateHotel : `, error);
  }
};
