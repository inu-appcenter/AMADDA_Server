const format = require("mysql").format;
const getConn = require("../config/database/db_connect");
const moment = require("moment");
const { onSendingMsgError } = require("../controller/logController");
const {
  selectSchedule_group_all,
  selectSchedule_id_groups_day_all,
  selectSchedule_id_groups_week_all,
  selectSchedule_id_groups_month_all,
  insertSchedule_all_all,
  selectSchedule_number_id_groups_all,
  selectSchedule_idNumber_all,
  deleteSChedule_idNumber_all,
  selectSchedule_number_id_all,
  updateSchedule_all_all,
  selectSchedule_all_share_all,
  selectSchedule_user_id_all
} = require("../config/database/db_sql");

/**
 * 시작 시간과 종료 시간 비교 함수
 * @param {시작 시간} start
 * @param {종료 시간} end
 * @return Promise<boolean>
 */
function dateCompare(start, end) {
  return new Promise((resolve) => {
    const s = new Date(start);
    const e = new Date(end);
    if (s >= e) resolve(false);
    else resolve(true);
  });
}

/**
 * 일정 보기 관련 sql 생성 함수
 * @param {get 방식의 쿼리} num
 * @param {사용자} user
 * @param {사용자가 속해있는 그룹들} groups
 * @return string(sql)
 */
function showSchedule(num = Number, user = Object, date = String) {
  return new Promise((resolve) => {
    const { id, name, email } = user;
    switch (num) {
      case 0: // 하루 일정 ex) 2020-03-19
        resolve(format(selectSchedule_id_groups_day_all, [id, id, date]));
        break;
      case 1: // 주간 일정 ex) 2020-03-29 (날짜가 속한 주)
        resolve(format(selectSchedule_id_groups_week_all, [id, id, date]));
        break;
      case 2: // 월간 일정 ex) 2020-04
        resolve(
          format(selectSchedule_id_groups_month_all, [id, id, date, date])
        );
        break;
      case 3: // 전체 일정
        resolve(format(selectSchedule_all_share_all, [id, id]));
        break;
      default:
        resolve(null);
        break;
    }
  });
}

module.exports = {
  add: async (req, res, next) => {
    let {
      schedule_name,
      start,
      end,
      location,
      alarm,
      share,
      memo,
      hidden,
      user,
    } = req.body;

    // 시작과 끝 날짜 비교
    if (!(await dateCompare(start, end)))
      return onSendingMsgError("end check", req, res, 465);
    if (
      schedule_name == null ||
      schedule_name == "" ||
      start == null ||
      start == "" ||
      end == null ||
      end == ""
    )
      return onSendingMsgError(
        "schedule_name or start or end is null",
        req,
        res,
        465
      );
    // db 외래키
    try {
      const schedule = {
        id: user.id,
        schedule_name,
        start,
        end,
        location: location == "" ? null : location,
        alarm: alarm == "" ? null : alarm,
        share: share == -1 || share == "" ? null : share,
        memo: memo == "" ? null : memo,
        hidden: hidden == null ? 0 : hidden,
      };
      const sql = format(insertSchedule_all_all, schedule); // 일정 추가
      // const overlapSql = format(SQL.selectSchedule_endStart_count, [
      //   end,
      //   start,
      //   user.id
      // ]); // 중복 검사
      // 개인 일정 추가
      // 일단 중복 처리는 서버에서 뺐음
      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res);
        conn.query(sql, (e) => {
          if (e) return onSendingMsgError(e.message, req, res);
          next();
        });
        conn.release();
      });
      // 공유 일정 작성 시 중복 가능?
    } catch (scheduleAddError) {
      return onSendingMsgError(scheduleAddError.message, req, res);
    }
  },

  detail: async (req, res, next) => {
    // 내가 작성한 일정 또는 내가 속해있는 그룹의 일정만 접근 가능함
    const { user } = req.body;
    const { num } = req.query;
    if (num == null)
      return onSendingMsgError("number is null", req, res, 465, "schedule");
    try {
      const sql = format(selectSchedule_number_id_groups_all, [
        num,
        user.id,
        user.id,
      ]);
      getConn((e, conn) => {
        if (e) throw new Error(e.message);
        conn.query(sql, (err, rows) => {
          if (err) throw new Error(err.message);
          else {
            if (rows.length == 0) {
              return onSendingMsgError("not exist", req, res, 404, "schedule");
            } else {
              rows[0].start = moment(rows[0].start).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              rows[0].end = moment(rows[0].end).format("YYYY-MM-DD HH:mm:ss");
              req.row = rows[0];
              next();
            }
          }
        });
        conn.release();
      });
    } catch (scheduleDetailError) {
      return onSendingMsgError(
        scheduleDetailError.message,
        req,
        res,
        500,
        "schedule"
      );
    }
  },

  show: (num) => async (req, res, next) => {
    const { user } = req.body;
    let { date } = req.query;
    
    if (date && date[0] !== '\"') date = '\"' + date + '\"'
    
    
    if (num != 3 && (date == null || new Date(date)) == "Invalid Date")
      return onSendingMsgError("date error", req, res, 465, "schedules");
    const sql = await showSchedule(num, user, new Date(date));
    try {
      getConn((error, conn) => {
        if (error)
          return onSendingMsgError("db error", req, res, 500, "schedules");
        else {
          conn.query(sql, (ee, r) => {
            if (ee) {
              return onSendingMsgError(ee.message, req, res, 500, "schedules");
            } else {
              r.forEach((el, i) => {
                el.start = moment(el.start).format("YYYY-MM-DD HH:mm:ss");
                el.end = moment(el.end).format("YYYY-MM-DD HH:mm:ss");
              });
              req.body.schedules = r;
              next();
            }
          });
        }
        conn.release();
      });
    } catch (showError) {
      return onSendingMsgError(showError.message, req, res, 500, "schedules");
    }
  },

  showGroup: async (req, res, next) => {
    const { user } = req.body;
    const { share } = req.query;
    if (share == null)
      return onSendingMsgError("share is null", req, res, 465, "schedules");
    const sql = format(selectSchedule_group_all, share);
    try {
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, "schedules");
        } else {
          conn.query(sql, (ee, r) => {
            if (ee)
              return onSendingMsgError(ee.message, req, res, 500, "schedules");
            r.forEach((el, i) => {
              el.start = moment(el.start).format("YYYY-MM-DD HH:mm:ss");
              el.end = moment(el.end).format("YYYY-MM-DD HH:mm:ss");
            });
            req.body.schedules = r;
            next();
          });
        }
        conn.release();
      });
    } catch (shareGroupError) {
      return onSendingMsgError(
        shareGroupError.message,
        req,
        res,
        500,
        "schedules"
      );
    }
  },

  showMe: async (req, res, next) => {
    const { user } = req.body;
    const sql = format(selectSchedule_user_id_all, user.id);
    try {
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, "schedules");
        } else {
          conn.query(sql, (ee, r) => {
            if (ee)
              return onSendingMsgError(ee.message, req, res, 500, "schedules");
            r.forEach((el, i) => {
              el.start = moment(el.start).format("YYYY-MM-DD HH:mm:ss");
              el.end = moment(el.end).format("YYYY-MM-DD HH:mm:ss");
            });
            req.body.schedules = r;
            next();
          });
        }
        conn.release();
      });
    } catch (shareGroupError) {
      return onSendingMsgError(
        shareGroupError.message,
        req,
        res,
        500,
        "schedules"
      );
    }
  },

  scDelete: async (req, res, next) => {
    const { number, user } = req.body;
    if (number == null)
      return onSendingMsgError("number is null", req, res, 465);
    try {
      const sql1 = format(selectSchedule_idNumber_all, [
        user.id,
        Number(number),
      ]);
      const sql2 = format(deleteSChedule_idNumber_all, [
        user.id,
        Number(number),
      ]);

      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res);
        conn.query(sql1, (sql1Err, rows) => {
          if (sql1Err) return onSendingMsgError(sql1Err.message, req, res);
          if (rows.length == 0)
            return onSendingMsgError("not exist", req, res, 404);
          conn.query(sql2, (sql2Err) => {
            if (sql2Err) return onSendingMsgError(err.message, req, res);
            next();
          });
        });
        conn.release();
      });
    } catch (scheduleDeleteError) {
      return onSendingMsgError(scheduleDeleteError.message, req, res);
    }
  },

  modify: async (req, res, next) => {
    let {
      number,
      schedule_name,
      start,
      end,
      location,
      alarm,
      share,
      memo,
      hidden,
      user,
    } = req.body;
    if (number == null || number == "")
      return onSendingMsgError("number is null", req, res, 465);
    if (schedule_name == null || schedule_name == "")
      return onSendingMsgError("schedule_name is null", req, res, 465);
      // 시작과 끝 날짜 비교
    if (!(await dateCompare(start, end)))
      return onSendingMsgError("end check", req, res, 465);
    // if (hidden != 0 && hidden != 1)
    //   return onSendingMsgError("hidden is not tinyint", req, res, 465);
    
    if (share == -1) share = null
    try {
      let sql2Data = [
        schedule_name,
        location,
        start,
        end,
        alarm,
        share,
        memo,
        // hidden,
        Number(number),
      ];
      const sql1 = format(selectSchedule_number_id_all, [
        parseInt(number),
        user.id,
      ]);
      const sql2 = format(updateSchedule_all_all, sql2Data);
      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res);
        conn.query(sql1, (sql1Err, rows) => {
          // 일정이 존재하는지 확인
          if (sql1Err) return onSendingMsgError(sql1Err.message, req, res);
          if (rows.length == 0)
            return onSendingMsgError("not exist", req, res, 404);
          conn.query(sql2, (sql2Err) => {
            // 일정 수정
            if (sql2Err) return onSendingMsgError(sql2Err.message, req, res);
            next();
          });
        });
        conn.release();
      });
    } catch (scheduleModifyError) {
      return onSendingMsgError(scheduleModifyError.message, req, res);
    }
  },
};
