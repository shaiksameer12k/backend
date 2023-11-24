import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
    });

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary:", response.url);

    // Remove the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Handle errors
    console.error("Error uploading file to Cloudinary:", error);

    // Remove the locally saved temporary file as the upload operation failed
    fs.unlinkSync(localFilePath);

    return null;
  }
};
export { uploadOnCloudinary };
