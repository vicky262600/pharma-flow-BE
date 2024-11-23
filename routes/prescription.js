const router = require("express").Router();
const Prescription = require("../models/Prescription");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Pharmcist = require("../models/Pharmacy");

// create prescription
router.post("/create", async (req, res) => {
  const { patientEmail, ...prescriptionData } = req.body;

  try {
    // Find patient by email
    const patientData = await Patient.findOne({ patientEmail: patientEmail });

    // Handle case when patient is not found
    if (!patientData) {
      return res.status(404).json({ error: "Patient not found" }); // Add return here
    }

    // Set patientId and create prescription
    prescriptionData.patientId = patientData._id;
    prescriptionData.patientName = patientData.patientName;
    const newPrescription = new Prescription(prescriptionData);
    const prescription = await newPrescription.save();

    // Respond with the created prescription
    return res.status(201).json(prescription); // Add return here
  } catch (err) {
    // Handle other errors
    console.error("Error creating prescription:", err);
    return res.status(500).json({ error: "Internal server error" }); // Use 500 for server errors
  }
});

// get user's prescription
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const prescriptions = await Prescription.find({
      $or: [
        { doctorId: userId },
        { patientId: userId },
        { pharmacyId: userId },
      ],
    });
    res.status(201).json(prescriptions);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
