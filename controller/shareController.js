const format = require("mysql").format;
const { onSendingMsgError } = require("./logController");
const getConn = require("../config/database/db_connect");
const {
  selectUser_id_likeAll,
  insertShareGroup_all_all,
  insertShareGroupUser_all_all,
  updateUser_invite_id,
  selectShareGroupUser_id_all,
  selectShareGroupUser_share_count,
  deleteShareGroupUser_idShare_all,
  deleteShareGroup_share_all,
  selectShareGroupUser_share_id,
  updateSchedule_id_share_shareNull,
  insertShareGroupInvited_all_all,
  selectShareGroupInvited_id_all,
  deleteShareGroupInvited_share_all,
} = require("../config/database/db_sql");

module.exports = {
  createGroup: async (req, res, next) => {
    // 그룹 생성 후 초대하기 : 다른 미들웨어에서 초대 기능 구현
    const { groupName, memo, user } = req.body;

    if (groupName == null)
      return onSendingMsgError("groupName is null", req, res, 465);
    try {
      const sql1 = format(insertShareGroup_all_all, [groupName, memo]);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res);
        } else {
          conn.query(sql1, (ee, rows) => {
            if (ee) return onSendingMsgError(ee.message, req, res);
            req.body.share = rows[0].insertId;
            const sql2 = format(insertShareGroupUser_all_all, {
              share: rows[0].insertId,
              id: user.id,
            });
            conn.query(sql2, (e) => {
              if (e) return onSendingMsgError(e.message, req, res);
              next();
            });
          });
        }
        conn.release();
      });
    } catch (createGroupError) {
      return onSendingMsgError(createGroupError.message, req, res);
    }
  },

  inviteGroup: async (req, res, next) => {
    // 그룹이 성공적으로 생성됬을 때 초대장 보내기
    // list = [id:String, ...]
    const { list, share, groupName, memo, user } = req.body;

    if (!Array.isArray(list)) return next();
    else if (list.length == 0) return next();

    try {
      list.forEach((e, i) => {
        list[i] = [e, share, groupName, user.name, user.id, memo];
      });
      const sql = format(insertShareGroupInvited_all_all, [list]);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res);
        } else {
          conn.query(sql, (e) => {
            if (e) return onSendingMsgError("학번 확인바람", req, res);
            next();
          });
        }
        conn.release();
      });
    } catch (groupInviteError) {
      return onSendingMsgError(groupInviteError.message, req, res);
    }
  },

  userSearch: async (req, res, next) => {
    const { user } = req.query;
    if (user == null || user == "")
      return onSendingMsgError("user is null", req, res, 465, "users");

    try {
      const sql = format(selectUser_id_likeAll, "%" + user + "%");
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("DB error", req, res, 500, "users");
        } else {
          conn.query(sql, (e, rows) => {
            if (e) return onSendingMsgError(e.message, req, res, 500, "users");
            if (rows.length == 0)
              return onSendingMsgError(
                "user does not exist",
                req,
                res,
                404,
                "users"
              );
            req.body.users = rows.map((e, i) => e);

            next();
          });
        }
        conn.release();
      });
    } catch (userSearchError) {
      return onSendingMsgError(userSearchError.message, req, res, 500, "user");
    }
  },

  beInvitedModify: async (req, res, next) => {
    const { flag, user } = req.body;
    if (!(flag < 2 && flag > -1))
      return onSendingMsgError("flag check", req, res);

    try {
      const sql = format(updateUser_invite_id, [flag, user.id]);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError(error.message, req, res);
        } else {
          conn.query(sql, (e) => {
            if (e) return onSendingMsgError(e.message, req, res);
            next();
          });
        }
        conn.release();
      });
    } catch (beInvitedModifyError) {
      return onSendingMsgError(beInvitedModifyError.message, req, res);
    }
  },

  userGroups: async (req, res, next) => {
    const { user } = req.body;
    const sql = format(selectShareGroupUser_id_all, user.id);
    try {
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, "groups");
        } else {
          conn.query(sql, (e, rows) => {
            if (e) return onSendingMsgError(e.message, req, res, 500, "groups");
            if (rows.length == 0) {
              req.body.groups = [];
              next();
              return;
            }
            let groups = [];
            rows.forEach((el, i) => {
              groups[i] = el;
              if (i == rows.length - 1) {
                req.body.groups = groups;
                next();
              }
            });
          });
        }
        conn.release();
      });
    } catch (userGroupError) {
      return onSendingMsgError(userGroupError.message, req, res, 500, "groups");
    }
  },

  groupEscape: async (req, res, next) => {
    // 공유 일정을 개인 일정으로 변경
    // 그룹_유저 테이블에서 내 아이디 삭제
    // 더 이상 그룹에 아무도 존재하지 않으면 그룹 삭제
    let { share, user } = req.body;
    if (share == null) return onSendingMsgError("share is null", req, res, 465);
    share = Number(share);

    try {
      const sql1 = format(updateSchedule_id_share_shareNull, [user.id, share]); // 그룹에 공유한 일정을 개인 일정으로
      const sql2 = format(selectShareGroupUser_share_count, [share, share]); // 그룹 존재 여부와 인원 수
      const sql3 = format(deleteShareGroup_share_all, share); // 그룹 삭제
      const sql4 = format(deleteShareGroupUser_idShare_all, [user.id, share]); // 그룹 나가기

      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res);
        conn.query(sql1, (e) => {
          if (e) {
            conn.release();
            return onSendingMsgError(e.message, req, res);
          }
          conn.query(sql2, (e, r) => {
            if (e) {
              conn.release();
              return onSendingMsgError(e.message, req, res);
            }
            if (r[0].count == 1) {
              // 그룹 삭제
              conn.query(sql3, (e) => {
                if (e) {
                  conn.release();
                  return onSendingMsgError(e.message, req, res);
                }
                conn.release();
                next();
              });
            } else if (r[0].count > 1) {
              // 그룹 나가기
              conn.query(sql4, (e) => {
                if (e) {
                  conn.release();
                  return onSendingMsgError(e.message, req, res);
                }
                conn.release();
                next();
              });
            } else {
              // 그룹이 존재하지 않음
              conn.release();
              return onSendingMsgError("그룹이 없음", req, res);
            }
          });
        });
      });
    } catch (groupEscapeError) {
      return onSendingMsgError(groupEscapeError.message, req, res);
    }
  },

  member: async (req, res, next) => {
    const { user } = req.body;
    const share = req.query.share;

    if (share == null || share == "")
      return onSendingMsgError("share is null", req, res, 465, "members");

    try {
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, "member");
        } else {
          const sql = format(selectShareGroupUser_share_id, Number(share));
          conn.query(sql, (e, r) => {
            if (e)
              return onSendingMsgError(e.message, req, res, 500, "members");
            req.body.members = r.map((e) => ({id:e.id, name:e.name, path:e.path}));
            next();
          });
        }
        conn.release();
      });
    } catch (memberError) {
      return onSendingMsgError(memberError.message, req, res, 500, "members");
    }
  },

  showInvitations: async (req, res, next) => {
    const { user } = req.body;
    try {
      const sql = format(selectShareGroupInvited_id_all, user.id);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, "invitations");
        } else {
          conn.query(sql, (e, rows) => {
            if (e)
              return onSendingMsgError(e.message, req, res, 500, "invitations");
            rows.forEach((el) => {
              delete el.id;
            });
            req.body.invitations = rows;
            next();
          });
        }
        conn.release();
      });
    } catch (showInvitationsError) {
      return onSendingMsgError(
        showInvitationsError.message,
        req,
        res,
        500,
        "invitations"
      );
    }
  },

  rejectInvitations: async (req, res, next) => {
    const { user, share } = req.body;
    if (share == null) return onSendingMsgError("share is null", req, res);
    try {
      const sql = format(deleteShareGroupInvited_share_all, [share, user.id]);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res);
        } else {
          conn.query(sql, (e) => {
            if (e) return onSendingMsgError(e.message, req, res);
            next();
          });
        }
        conn.release();
      });
    } catch (rejectInvitationsError) {
      return onSendingMsgError(rejectInvitationsError.message, req, res);
    }
  },

  acceptInvitations: async (req, res, next) => {
    // 초대 관리 테이블에서 관련 튜플 삭제
    // 그룹 유저 테이블에 사용자 추가
    const { user, share } = req.body;
    if (share == null) return onSendingMsgError("share is null", req, res);
    try {
      const groupUser = { share, id: user.id };
      const sql1 = format(deleteShareGroupInvited_share_all, [share, user.id]);
      const sql2 = format(insertShareGroupUser_all_all, groupUser);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res);
        } else {
          conn.query(sql1 + sql2, (e) => {
            if (e) return onSendingMsgError(e.message, req, res);
            next();
          });
        }
        conn.release();
      });
    } catch (acceptInvitationsError) {
      return onSendingMsgError(acceptInvitationsError.message, req, res);
    }
  },
};
