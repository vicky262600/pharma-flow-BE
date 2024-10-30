const router = require("express").Router();
const Prescription = require("../models/Prescription");

router.post("/", async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const prescription = await newPrescription.save();

    res.status(201).json(prescription); // Changed to 201
  } catch (err) {
    res.status(404).json(err); // 404 is okay here if you want to indicate "not found"
  }
});

module.exports = router;
