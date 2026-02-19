import { v2 as cloudinary } from "cloudinary";
import { envVars } from ".";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD,
  api_secret: envVars.CLOUDINARY_API_SECRET,
  api_key: envVars.CLOUDINARY_API_KEY,
});

export const cloudinaryUpload = cloudinary;
