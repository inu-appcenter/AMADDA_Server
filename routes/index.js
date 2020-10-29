const router = require("express").Router();
const { onStart } = require("../controller/logController");

router.get("/", (req, res) => {
  res.status(200).send(`<h1>캘린더앱 홈 화면입니다</h1>`);
  onStart("Complete", req);
});

module.exports = router;
