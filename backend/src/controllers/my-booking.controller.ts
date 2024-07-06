import { Hotel } from "../models/hotel.model";
import { Request, Response, NextFunction } from "express";
import { Hoteltype } from "../shared/types";

export const myBookigs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req._id } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req._id
      );

      const hotelWithUserBookings: Hoteltype = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error: any) {
    console.log(error);
    next(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};
