const jwt = require("jsonwebtoken");
const jwtObj = require("../config/jwt/jwt_config");
const { onSendingMsgError } = require("./logController");
const getConn = require("../config/database/db_connect");
const { selectUser_id_exist } = require("../config/database/db_sql");

module.exports = {
  verify: function (token) {
    return new Promise((reslove, reject) => {
      jwt.verify(token, jwtObj.secret_key, (err, user) => {
        if (err) reject(err);
        reslove(user);
      });
    });
  },
  myVerify: (dataName = "data") => (req, res, next) => {
    jwt.verify(req.headers.token, jwtObj.secret_key, async (e, u) => {
      if (e)
        return onSendingMsgError("token is invalid", req, res, 403, dataName);
      getConn((error, conn) => {
        if (error) {
          return onSendingMsgError("db error", req, res, 500, dataName);
        } else {
          conn.query(selectUser_id_exist, u.id, (e, r) => {
            if (e) return onSendingMsgError(e.message, req, res, 500, dataName);
            if (!r[0].exist)
              return onSendingMsgError("not a member", req, res, 403, dataName);
            req.body.user = u;
            req.headers.id = u.id; // formdata용으로 사용함
            next();
          });
        }
        conn.release();
      });
    });
  },
};
