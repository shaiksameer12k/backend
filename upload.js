import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";

import { uploadCloudinary } from "./cloud.js";
const app = express();
const port = 8000;
app.use(cors());

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = "./public/2023";

    // Check if the folder exists, and create it if not
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Set the filename to be unique
  },
});

const upload = multer({ storage: storage });

// Handle POST request with file upload
// app.post("/upload", upload.single("file"), (req, res) => {
app.post(
  "/upload",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    // Assuming the file field in the form is named 'file'
    const uploadedFile = req.files?.avatar[0]?.path;

    if (!uploadedFile) {
      return res.status(400).send("No file uploaded.");
    }

    const avatar = await uploadCloudinary(uploadedFile);

    console.log("avatar", avatar);

    // Process the uploaded file as needed
    res.send("File uploaded successfully!");

    // fs.unlinkSync(path)
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
