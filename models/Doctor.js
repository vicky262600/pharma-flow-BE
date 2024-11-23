const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    licenseNumber: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
