import { v2 as cloudinary } from "cloudinary";
import { envVars } from ".";
import AppError from "../errorsHelpers/AppError";
import status from "http-status";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD,
  api_secret: envVars.CLOUDINARY_API_SECRET,
  api_key: envVars.CLOUDINARY_API_KEY,
});

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;

    const match = url.match(regex);

    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
    }
  } catch (error) {
    console.log("Error Deleting file from cloudinary");
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to delete file from cloudinary.",
    );
  }
};
export const cloudinaryUpload = cloudinary;
