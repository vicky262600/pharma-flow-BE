const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const authRouter = require("./routes/auth");
const prescriptionRouter = require("./routes/prescription");

dotenv.config();

const app = express();

// Use CORS middleware to allow requests from http://localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin
  })
);

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/prescription", prescriptionRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
