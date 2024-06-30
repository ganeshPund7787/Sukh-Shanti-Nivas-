import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { Hotel } from "../models/hotel.model";
import { isAuthenticated } from "../middleware/Auth";
import { body } from "express-validator";
import { getMyHotel, getMyHotelEdit } from "../controllers/hotel.controller";
import { Hoteltype } from "../shared/types";
import { errorHandler } from "../utils/error.Handler";

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

      const imageUrls = await UploadImages(imageFiles);

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

router.get("/", isAuthenticated, getMyHotel);

router.get("/:id", isAuthenticated, getMyHotelEdit);
router.put(
  "/:hotelId",
  isAuthenticated,
  upload.array("imageFiles"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateNewHotel: Hoteltype = req.body;
      updateNewHotel.lastUpdated = new Date();

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req._id,
        },
        updateNewHotel,
        { new: true }
      );

      if (!hotel) {
        return next(errorHandler(404, "Hotel is not found"));
      }

      const files = req.files as Express.Multer.File[];
      const updateImageUrls = await UploadImages(files);

      hotel.imageUrls = [
        ...updateImageUrls,
        ...(updateNewHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(200).json(hotel);
    } catch (error: any) {
      next(error.message);
    }
  }
);

async function UploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURL = "data:" + image.mimetype + ";base64," + b64;
    const res = cloudinary.v2.uploader.upload(dataURL);
    return (await res).url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
export default router;
