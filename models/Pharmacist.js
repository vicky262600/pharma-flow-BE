const mongoose = require("mongoose");

const PharmacistSchema = new mongoose.Schema(
  {
    pharmacyId: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacist", PharmacistSchema);
