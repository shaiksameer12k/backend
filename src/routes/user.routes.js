import { Router } from "express";
import { registerUserController } from "../controllers/register.user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { loginUserController } from "../controllers/login.user.controller.js";
import { ApiRes } from "../utils/ApiRes.js";
import { User } from "../models/user.model.js";
import { Employee } from "../models/emp.model.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    registerUserController
  );

router.route("/login").post(loginUserController);

router.route("/getUsersData").get(async (req, res) => {
  let userData = await User.find();

  res.status(200).json(new ApiRes(200, userData, "User Data"));
});

router.route("/getUserSubEmpsData").post(async (req, res) => {
  let { managerId } = req.body;
  let userData = await User.findById(managerId);

  let subEmps = await Employee.find({ _id: { $in: userData.employeeIds } });

  res.status(200).json(new ApiRes(200, subEmps, "Team Data"));
});


export default router;
