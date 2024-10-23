const router = require("express").Router();

router.get("/auth", (req, res) => {
  res.send("user test is ok");
});

module.exports = router;
