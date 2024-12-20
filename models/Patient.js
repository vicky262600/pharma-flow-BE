const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    patientName: { type: String, require: true },
    patientEmail: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
