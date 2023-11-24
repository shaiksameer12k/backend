import { Employee } from "../models/emp.model.js";
import { User } from "../models/user.model.js";
import { ApiErr } from "../utils/ApiErr.js";
import { ApiRes } from "../utils/ApiRes.js";
import { asyncApiHandel } from "../utils/asyncApiHandel.js";

const createEmpController = asyncApiHandel(async (req, res) => {
  let { empName, managerId } = req.body;

  console.log(empName, managerId);
  
  if([empName,managerId].some(field => !field.length > 0)){
    throw new ApiErr(400, "All Fields are Required");
  }

  let existManger = await User.findById(managerId);

  let emp = { empName, manager: existManger._id };

  let empData = new Employee(emp);
  await empData.save();

  existManger.employeeIds.push(empData._id);
  await existManger.save();

  res
    .status(200)
    .json(new ApiRes(200, empData, "Successfully Employee Created"));
});

export { createEmpController };
