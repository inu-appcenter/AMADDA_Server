const getConn = require("../config/database/db_connect");
const mysql = require("mysql");
const {
  selectUser_id_all,
  insertUser_all_all,
  deleteUser_id_all,
  selectUser_id_path
} = require("../config/database/db_sql");
const request = require("request");
const jwtC = require("./jwtController");
// appCenter conifg
const ac = require("../config/appCenter");
const { onSendingMsgError } = require("./logController");

module.exports = {
  login: function(req, res, next) {
    const { id, passwd } = req.body;
    if (id == null || passwd == null)
      return onSendingMsgError("id or passwd is null", req, res, 465);
    // 앱센터 통합 서버로 보낼 쿼리
    const query = ac.queryOptions("signIn", "post", {
      id: req.body.id,
      passwd: req.body.passwd
    });

    try {
      // 앱센터에 로그인 요청
      request.post(query, async (e, resp) => {
        if (e) return onSendingMsgError(e.message, req, res);
        else {
          if (resp.body.ans == "password")
            return onSendingMsgError("계정 확인", req, res, resp.statusCode);
          else {
            // 비밀번호가 맞았을 때 토큰 해독 후 아마따 가입과 동시에 로그인
            await jwtC
              .verify(resp.body.token)
              .then(data => {
                const { id, name } = data;
                const sql1 = mysql.format(selectUser_id_all, id);
                const sql2 = mysql.format(insertUser_all_all, {
                  id: id,
                  name: name,
                  email: `${id}@inu.ac.kr`,
                  path: null,
                  invite: 1 // 첫 가입 시 초대 허용으로
                });
                // 디비에 유저가 있는지 확인
                getConn((error1, conn) => {
                  if (error1)
                    return onSendingMsgError(error1.message, req, res, 500);
                  conn.query(sql1, (err1, results) => {
                    if (err1) return onSendingMsgError(err1.message, req, res);
                    if (results.length == 0)
                      conn.query(sql2, err => {
                        if (err)
                          return onSendingMsgError(err.message, req, res);
                        // 첫 로그인 시
                        req.body.token = resp.body.token;
                        next();
                      });
                    else {
                      // 기존 아마따 회원이라면
                      req.body.token = resp.body.token;
                      next();
                    }
                  });
                  conn.release();
                });
              })
              .catch(error5 => onSendingMsgError("미가입자", req, res, 403));
          }
        }
      });
    } catch (loginError) {
      return onSendingMsgError(loginError.message, req, res, 500);
    }
  },

  tmpPasswd: async function(req, res, next) {
    try {
      const { id, name } = req.body;
      if (id == null || id == "" || name == null || name == "")
        return onSendingMsgError("id or name is null", req, res, 465);
      const query = ac.queryOptions("changeInfo/tmpPasswd", "post", {
        id,
        name
      });
      request.post(query, (e, resp) => {
        if (e) return onSendingMsgError(e.message, req, res);
        else {
          if (resp.body.ans == "err")
            return onSendingMsgError("잘못된 입력", req, res, 465);

          req.body = resp;
          req.body.id = id;
          next();
        }
      });
    } catch (tmpPasswdError) {
      return onSendingMsgError(tmpPasswdError.message, req, res);
    }
  },

  // 보류
  accountModify: async function(req, res, next) {},

  passwordModify: async function(req, res, next) {
    const { passwd, newPasswd } = req.body;
    if (passwd == null || newPasswd == null)
      return onSendingMsgError("passwd or newPasswd is null", req, res, 465);
    try {
      const user = {
        id: req.body.user.id,
        passwd,
        newPasswd,
        tel: req.body.user.tel,
        major: req.body.user.major,
        name: req.body.user.name
      };
      const query = ac.queryOptions("changeInfo", "post", user);
      request.post(query, async (e, resp) => {
        if (e) return onSendingMsgError(e.message, req, res);
        else {
          // 앱센터 통합으로 요청 성공
          // 비밀번호가 틀렸을 때
          if (resp.body.ans == "password")
            if (user.newPasswd == "" || user.newPasswd == null)
              return onSendingMsgError("newPasswd error", req, res, 465);
            else return onSendingMsgError("passwd error", req, res, 465);
          // 비밀번호가 틀리지 않았을 때
          else {
            req.body = user;
            next();
          }
        }
      });
    } catch (passwordModifyError) {
      return onSendingMsgError(passwordModifyError.message, req, res);
    }
  },

  secession: async function(req, res, next) {
    const sql1 = mysql.format(selectUser_id_all, req.body.user.id);
    const sql2 = mysql.format(deleteUser_id_all, req.body.user.id);
    try {
      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res);
        conn.query(sql1, (e, rows) => {
          if (e) return onSendingMsgError(e.message, req, res);
          if (rows.length == 0) return onSendingMsgError("없는 계정", req, res);
          conn.query(sql2, e => {
            if (e) return onSendingMsgError(e.message, req, res);
            next();
          });
        });
        conn.release();
      });
    } catch (secessionError) {
      return onSendingMsgError(secessionError.message, req, res);
    }
  },

  getUserImage: async (req,res,next) => {
    const getImageSQL = mysql.format(selectUser_id_path, req.body.user.id);
    try{
      getConn((dbErr, conn)=>{
        if (dbErr) return onSendingMsgError(dbErr.message, req, res);
        conn.query(getImageSQL, (connErr, rows)=>{
          if (connErr) return onSendingMsgError(connErr.message, req, res);
          req.body.path = rows[0].path;
          next();
        })
        conn.release();
      })
    }catch(getUserImageErr) {
      return onSendingMsgError(getUserImageErr.message, req, res);
    }
  }
};
