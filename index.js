const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1", authRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
