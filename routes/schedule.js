/**
 * @date_format YYYY-MM-dd HH:MM:SS
 */
const router = require("express").Router();
const {
  add,
  modify,
  detail,
  show,
  scDelete,
  showGroup,
  showMe
} = require("../controller/scheduleController");
const myRes = require("../util/myResponse");
const { onStart } = require("../controller/logController");
const { myVerify } = require("../controller/jwtController");

/**
 * 개인, 공유 일정 추가
 * @request token,name,start,end,location,alarm?,share?,memo
 */
router.post("/add", myVerify(), add, (req, res) => {
  res.status(201).json(myRes(true, "일정 추가 성공"));
  onStart("Complete", req);
});

/**
 * 일정 보기(세부사항)
 * @request token, number
 */
router.get("/detail", myVerify("schedule"), detail, (req, res) => {
  res.status(200).json(myRes(true, "일정 보기 성공", req.row, "schedule"));
  onStart(`${req.body.id}:complete in ${req.url}`);
  onStart("Complete", req);
});

router.get("/show/day", myVerify("schedules"), show(0), (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
});

router.get("/show/week", myVerify("schedules"), show(1), (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
});

router.get("/show/month", myVerify("schedules"), show(2), (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
});

router.get("/show/all", myVerify("schedules"), show(3), (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
});

router.get("/show/group", myVerify("schedules"), showGroup, (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
});
router.get("/show/me", myVerify("schedules"), showMe, (req,res)=>{
  res.status(200).json(myRes(true, "성공", req.body.schedules, "schedules"));
})

/**
 * 일정 삭제
 * @request token, number
 */
router.delete("/delete", myVerify(), scDelete, (req, res) => {
  res.status(201).json(myRes(true, "삭제 성공"));
  onStart("Complete", req);
});

/**
 * 일정 수정
 * @request token,number,schedule_name,location,alarm?,share?,memo
 */
router.put("/modify", myVerify(), modify, (req, res) => {
  res.status(201).json(myRes(true, "수정 성공"));
  onStart("Complete", req);
});

// 공유 일정 삭제
router.delete("/", (req, res) => {});
module.exports = router;
