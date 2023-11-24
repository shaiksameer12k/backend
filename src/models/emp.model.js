import mongoose, { Schema, mongo } from "mongoose";

const empAttendanceSchema = new Schema({
  empId: {
    type: Schema.Types.ObjectId,
    ref: "emps",
  },
  AttendanceDate: {
    type: String,
    required: true,
  },
  AttendanceStatus: {
    type: String,
    enum: ["P", "A"],
    default: "A",
  },
  _id: false,
});

const empSchema = new Schema({
  empName: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },

  Attendance: [empAttendanceSchema],
});

export const Employee = mongoose.model("emps", empSchema);
