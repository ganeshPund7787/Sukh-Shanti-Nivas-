import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Hotel, Hoteltype } from "../models/hotel.model";
import { isAuthenticated } from "../middleware/Auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

router.post(
  "/",
  isAuthenticated,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: Hoteltype = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const dataURL = "data:" + image.mimetype + ";base64," + b64;
        const res = cloudinary.v2.uploader.upload(dataURL);
        return (await res).url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req._id;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).json(hotel);
    } catch (error: any) {
      next(error);
      console.log(`Error create hotel: `, error);
    }
  }
);

export default router;
