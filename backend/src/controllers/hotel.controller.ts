import { Request, Response, NextFunction } from "express";
import { Hotel } from "../models/hotel.model";
import { Hoteltype } from "../shared/types";
import { errorHandler } from "../utils/error.Handler";

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

export const getMyHotelEdit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id.toString();
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req._id,
    });

    return res.json(hotel);
  } catch (error) {
    next(error);
    console.log(`Error while updateHotel : `, error);
  }
};
