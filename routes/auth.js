const router = require("express").Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Pharmacy = require("../models/Pharmacy");
const bcrypt = require("bcrypt");

//register
router.post("/register/doctor", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newDoctor = new Doctor({
      licenseNumber: req.body.doctorLicence,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const doctor = await newDoctor.save();
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/register/patient", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newPatient = new Patient({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const patient = await newPatient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register/Pharmacy", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newPharmacy = new Pharmacy({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const pharmacy = await newPharmacy.save();
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    let user = await Doctor.findOne({ email: req.body.email });
    if (!user) {
      user = await Patient.findOne({ email: req.body.email });
    }
    if (!user) {
      user = await Pharmacist.findOne({ email: req.body.email });
    }
    if (!user) {
      res.status(404).josn({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(404).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
