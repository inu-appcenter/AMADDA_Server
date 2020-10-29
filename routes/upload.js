const router = require("express").Router();
const { uploadImage, imageDelete } = require("../controller/uploadController");
const myRes = require("../util/myResponse");
// const fs = require("fs");
const { onSendingMsgError, onStart } = require("../controller/logController");
const { myVerify } = require("../controller/jwtController");

// 업로드
router.post("/", myVerify(), uploadImage(), (req, res) => {
  if (req.nextMiddleware != true)
    return onSendingMsgError("not file", req, res, 464);
  else if (req.tokenError)
    return onSendingMsgError("token is invalid", req, res, 403);
  else if (req.fileError) return onSendingMsgError("not image", req, res, 464);
  else if (req.DBError) return onSendingMsgError("database error", req, res);
  else res.status(201).json(myRes(true, "업로드 성공"));
  onStart(`Complete`, req);
});

// 삭제
router.delete("/", myVerify(), imageDelete, (req, res) => {
  res.status(201).json(myRes(true, "삭제 성공"));
  onStart(`Complete`, req);
});

// // 이미지 다운로드
// router.post("/get", (req, res) => {
//   const file = `./upload/201401535.png`;
//   res.status(201).download(file);
// });

// // 모든 이미지 보기
// router.get("/", (req, res) => {
//   fs.readdir("./upload", (err, files) => {
//     console.log(files);
//   });
// });

module.exports = router;
