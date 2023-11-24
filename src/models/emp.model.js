import mongoose, { Schema, mongo } from "mongoose";

const empSchema = new Schema({
  empName: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const Employee = mongoose.model("emps", empSchema);
