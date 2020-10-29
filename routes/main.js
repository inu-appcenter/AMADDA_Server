const router = require("express").Router();
// const myRes = require("../util/myResponse");
// // Controller
// const dbC = require("../controller/dbController");
// const mainC = require("../controller/mainController");
// // const oracle = require("oracledb");
// // const oracleConfig = require("../config/database/db_config").appCenter;

// router.post(
//   "/beinvited/modify",
//   dbC.isConnected,
//   mainC.beInvitedModify,
//   (req, res) => {
//     res.json(myRes(true, "초대 받기 변경 성공"));
//   }
// );

// router.post(
//   "/create/shareroom",
//   dbC.isConnected,
//   mainC.createShareRoom,
//   (req, res) => {
//     res.json(myRes(true, "공유방 생성 성공"));
//   }
// );

// router.get("/schedule", (req, res) => {
//   oracle.getConnection(oracleConfig, (err1, conn) => {
//     if (err1) console.log("1 : ", err1.message);
//     else {
//       // V_COURSE, V_COURSE_TIME
//       conn.execute("select * from V_COURSE", [], (err2, result) => {
//         if (err2) {
//           console.log("2 : ", err2.message);
//           conn.release();
//         } else {
//           console.log(result.metaData);
//           console.log(result.rows);
//           conn.release();
//           res.json(result.rows);
//         }
//       });
//     }
//   });
// });

module.exports = router;
