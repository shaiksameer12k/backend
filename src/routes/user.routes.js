import { Router } from "express";
import { registerUserController } from "../controllers/register.user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { loginUserController } from "../controllers/login.user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUserController
);

router.route("/login").post(loginUserController);

export default router;
