const router = require("express").Router();
const oracle = require("oracledb");
const myRes = require("../util/myResponse");
const { onSendingMsgError, onStart } = require("../controller/logController");
const { myVerify } = require("../controller/jwtController");

router.get("/", myVerify("subjects"), async (req, res) => {
  let conn;
  try {
    let pool = oracle.getPool();

    conn = await pool.getConnection();
    const result = await conn.execute("select * from V_COURSE");
    res.status(200).json(myRes(true, "성공", result.rows, "subjects"));
    onStart("Complete", req);
  } catch (error) {
    onSendingMsgError(error.message, req, res, 500, "subjects");
  } finally {
    if (conn) await conn.release();
  }
});

router.get("/search", myVerify("subjects"), async (req, res) => {
  const { name } = req.query;
  if (name === null || name === undefined || name === "") {
    return res.json({ success: true, message: "검색하세요.", subjects: [] });
  }
  let conn;
  try {
    let pool = oracle.getPool();

    conn = await pool.getConnection();
    // const sql = `
    //   SELECT DISTINCT V_COURSE.SC_NM,V_COURSE.EMP_NM,V_COURSE_TIME.DAY_GBN_NM,V_COURSE_TIME.LECTM_START,V_COURSE_TIME.LECTM_END
    //   FROM V_COURSE, V_COURSE_TIME
    //   WHERE EXISTS (
    //     SELECT 1 FROM V_COURSE_TIME
    //     WHERE V_COURSE.HAKSU_NO=V_COURSE.HAKSU_NO
    //       AND V_COURSE.SC_NM LIKE '%${name}%'
    //   )
    // `;
    // const sql2 = `
    // select V_COURSE.SC_NM,V_COURSE.EMP_NM,V_COURSE_TIME.DAY_GBN_NM,V_COURSE_TIME.LECTM_START,V_COURSE_TIME.LECTM_END,V_COURSE_TIME.ROOM_NM
    // from (
    //   select distinct *
    //   from V_COURSE
    //   where V_COURSE.SC_NM LIKE '%${name}%'
    // ) V_COURSE
    // inner join V_COURSE_TIME
    // on V_COURSE.HAKSU_NO=V_COURSE.HAKSU_NO `;
    

    const sql3 = `select distinct V_COURSE.SC_NM,V_COURSE.EMP_NM,V_COURSE_TIME.DAY_GBN_NM,V_COURSE_TIME.LECTM_START,V_COURSE_TIME.LECTM_END,V_COURSE_TIME.ROOM_NM 
    from V_COURSE, V_COURSE_TIME 
    where V_COURSE.SC_NM LIKE '%${name}%' AND V_COURSE.HAKSU_NO=V_COURSE_TIME.HAKSU_NO
    order by V_COURSE.SC_NM `;
    // [[수업이름, 교수님, 요일, 시작시간, 끝나는시간, 강의실], ...]
    // 과목명, 교수님, 요일, 시간, 위치
    const result = await conn.execute(sql3);
    const lecture = result.rows.map(el=>{
      const room = el[5].split(' ');
      if (room.length < 3) {
        // 보류
        return {lecture: el[0], professor: el[1], day: el[2], start: el[3], end: el[4], room: el[5]}
      }else if (room.length > 3) {
        // 보류
        return {lecture: el[0], professor: el[1], day: el[2], start: el[3], end: el[4], room: room[0] + ' '+ room[2].split('-')[1]+'호'}
      }else {
        return {lecture: el[0], professor: el[1], day: el[2], start: el[3], end: el[4], room: room[0].slice(1) + " " + room[1].split('-')[1] + '호'}
      }
    })
    res.status(200).json(myRes(true, "성공", lecture,"subjects"));
    onStart("Complete", req);
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) await conn.release();
  }
});

module.exports = router;
