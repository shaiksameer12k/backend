import { Employee } from "../models/emp.model.js";
import { User } from "../models/user.model.js";
import { ApiErr } from "../utils/ApiErr.js";
import { ApiRes } from "../utils/ApiRes.js";
import { asyncApiHandel } from "../utils/asyncApiHandel.js";

const createEmpController = asyncApiHandel(async (req, res) => {
  let { empName, managerId } = req.body;

  console.log(empName, managerId);

  let existManger = await User.findById(managerId);

  let emp = { empName, manager: existManger };

  let empData = await Employee.create(emp);

  res.json(empData);
});

export { createEmpController };
