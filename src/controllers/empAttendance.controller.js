import { asyncApiHandel } from "../utils/asyncApiHandel.js";
import { ApiErr } from "../utils/ApiErr.js";
import { ApiRes } from "../utils/ApiRes.js";
import { Employee } from "../models/emp.model.js";

const empAttendanceController = asyncApiHandel(async (req, res) => {
  let { empId, AttendanceDate, AttendanceStatus } = req.body;
  if (
    [empId, AttendanceDate, AttendanceStatus].some((field) => !field.length > 0)
  ) {
    throw new ApiErr(300, "All Fields Are Required");
  }

  let emp = await Employee.findById(empId);
  let AttendanceData = { AttendanceDate, AttendanceStatus };
  emp.Attendance.push(AttendanceData);
  await emp.save();

  // ! clear attendance data
  // emp.Attendance = [];
  // await emp.save();
  res.status(200).json(new ApiRes(200, emp, "Successfully Marked Attendance"));
});

export { empAttendanceController };
