const router = require("express").Router();
const {
  login,
  passwordModify,
  tmpPasswd,
  secession,
  getUserImage
} = require("../controller/userController");
const { myVerify } = require("../controller/jwtController");
const { onStart } = require("../controller/logController");
const myRes = require("../util/myResponse");
const fs = require("fs");

// Router
/**
 * @function 로그인
 * @method post
 */
router.post("/login", login, (req, res) => {
  res
    .status(201)
    .header({ token: req.body.token })
    .json(myRes(true, "로그인 성공"));
  onStart(`Complete`, req);
});

/**
 * @function 개인정보보기
 * @method post
 */
router.post("/account", myVerify("user"), (req, res) => {
  res
    .status(201)
    .json(myRes(true, "내 계정 불러오기 성공", req.body.user, "user"));
  onStart(`Complete`, req);
});

/**
 * @date 2020-09-15
 * @function 프로필이미지보기
 * @method get
 */
router.get('/image', myVerify("path"), getUserImage, (req,res)=>{
  res.status(200).json(myRes(true, "성공", req.body.path, "path"));
  onStart(`Complete`, req);
});

/**
 * @function 개인정보변경
 * @method put
 */
router.put("/account", (req, res) => {});

/**
 * @function 임시비밀번호
 * @method post
 */
router.post("/tmpPasswd", tmpPasswd, (req, res) => {
  res.status(201).json(myRes(true, "임시 비밀번호 발급 완료"));
  onStart(`Complete`, req);
});

/**
 * @function 비밀번호변경
 * @method put
 */
router.put("/passwd", myVerify(), passwordModify, (req, res) => {
  res.status(201).json(myRes(true, "비밀번호 변경 성공"));
  onStart(`Complete`, req);
});

/**
 * @function 아마따회원탈퇴
 * @method delete
 */
router.delete("/secession", myVerify(), secession, (req, res) => {
  fs.unlink(`./upload/${req.body.user.id}.png`, e => {});
  res.status(201).json(myRes(true, "탈퇴 성공"));
  onStart("Complete", req);
});
module.exports = router;
