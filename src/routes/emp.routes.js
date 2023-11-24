import { Router } from "express";

import { createEmpController } from "../controllers/create.emp.controller.js";

const router = Router();

router.route("/createEmp").post(createEmpController);

export default router;
