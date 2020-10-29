const router = require("express").Router();
const { share } = require("../controller/finalController");
const {
  createGroup,
  userSearch,
  beInvitedModify,
  userGroups,
  groupEscape,
  member,
  showInvitations,
  rejectInvitations,
  acceptInvitations,
  inviteGroup
} = require("../controller/shareController");
const { myVerify } = require("../controller/jwtController");
const myRes = require("../util/myResponse");
const { onStart } = require("../controller/logController");

/**
 *  @function 그룹생성
 *  @method post
 */
router.post(
  "/group/create",
  myVerify(),
  createGroup,
  inviteGroup,
  (req, res) => {
    res.status(201).json(myRes(true, "생성 성공", req.body.share, "share"));
    onStart("Complete", req);
  }
);

/**
 * @function 유저검색
 * @method get
 */
router.get(
  "/invite/users/search",
  myVerify("users"),
  userSearch,
  (req, res) => {
    res.status(200).json(myRes(true, "성공", req.body.users, "users"));
    onStart("Complete", req);
  }
);

/**
 * @function 초대유무변경
 * @method post
 */
router.post("/invite/user/flag", myVerify(), beInvitedModify, (req, res) => {
  res.status(201).json(myRes(true, "변경 성공"));
  onStart("Complete", req);
});

/**
 * @function 그룹가져오기
 * @method get
 */
router.get("/groups/show", myVerify("groups"), userGroups, (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.groups, "groups"));
  onStart("Complete", req);
});

/**
 * @function 그룹나가기
 * @method delete
 */
router.delete("/group/escape", myVerify(), groupEscape, (req, res) => {
  res.status(201).json(myRes(true, "나가기 성공"));
  onStart("Complete", req);
});

/**
 * @function 멤버보기
 * @method get
 */
router.get("/group/member", myVerify("members"), member, (req, res) => {
  res.status(200).json(myRes(true, "성공", req.body.members, "members"));
  onStart("Complete", req);
});

/**
 * @function 초대관리(조회)
 * @method get
 */
router.get(
  "/invitations/show",
  myVerify("invitations"),
  showInvitations,
  (req, res) => {
    res
      .status(200)
      .json(myRes(true, "성공", req.body.invitations, "invitations"));
    onStart("Complete", req);
  }
);

/**
 * @function 초대관리(거절)
 * @method delete
 */
router.delete(
  "/invitations/group",
  myVerify(),
  rejectInvitations,
  (req, res) => {
    res.status(201).json(myRes(true, "거절 성공"));
    onStart("Complete", req);
  }
);

/**
 * @function 초대관리(수락)
 * @method post
 */
router.post("/invitations/group", myVerify(), acceptInvitations, (req, res) => {
  res.status(201).json(myRes(true, "수락 성공"));
  onStart("Complete", req);
});

module.exports = router;
