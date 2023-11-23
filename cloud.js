import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
    });

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary:", response.url);

    // Remove the locally saved temporary file
    // fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Handle errors
    console.error("Error uploading file to Cloudinary:", error);

    // Remove the locally saved temporary file as the upload operation failed
    fs.unlinkSync(localFilePath);

    return null;
  }
};
const updateImageInCloudinary = async (publicId, newLocalFilePath) => {
  try {
    if (!publicId || !newLocalFilePath) {
      throw new Error("Missing public ID or new file path.");
    }

    // Upload the new version of the image with the same public ID
    const response = await cloudinary.uploader.upload(newLocalFilePath, {
      public_id: publicId,
      resource_type: "auto",
    });

    // Handle the response, e.g., log the new URL
    console.log("Image updated successfully:", response.url);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error updating image in Cloudinary:", error);
    return null;
  }
};

const deleteImageFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error("Missing public ID.");
    }

    // Delete the image with the specified public ID
    const deletionResult = await cloudinary.uploader.destroy(publicId);

    // Handle the deletion result
    if (deletionResult.result === "ok") {
      console.log("Image deleted successfully.");
    } else {
      console.error("Error deleting image from Cloudinary:", deletionResult);
    }

    return deletionResult;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
};

// ! upload
// const localFilePath = "public\\2023\\Sameer Shaik-signed.pdf";
// uploadOnCloudinary(localFilePath);
// export { uploadCloudinary };

// ! update
// const existingPublicId = "v4xwk3rzxbsp4ul6fmko";
// const newLocalFilePath = "public\\2023\\profile01.png";
//  updateImageInCloudinary(existingPublicId,newLocalFilePath)

// ! delete
// const deletePublicId = "v4xwk3rzxbsp4ul6fmko";
// deleteImageFromCloudinary(deletePublicId)
