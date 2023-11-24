import { Router } from "express";

import { createEmpController } from "../controllers/create.emp.controller.js";
import { empAttendanceController } from "../controllers/empAttendance.controller.js";

const router = Router();

router.route("/createEmp").post(createEmpController);

router.route("/markAttendance").post(empAttendanceController)

export default router;
