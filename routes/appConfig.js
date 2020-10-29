const router = require("express").Router();
const myRes = require("../util/myResponse");
const { onStart } = require("../controller/logController");
const { sidebar } = require("../controller/appConfigController");
const { myVerify } = require("../controller/jwtController");

router.get("/sidebar", myVerify("sidebar"), sidebar, (req, res) => {
  res.status(200).json(myRes(true, "성공", req.user, "sidebar"));
  onStart("Complete", req);
});

module.exports = router;
