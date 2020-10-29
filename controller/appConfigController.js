const { onSendingMsgError } = require("./logController");
const getConn = require("../config/database/db_connect");
const format = require("mysql").format;
const { selectUser_id_all } = require("../config/database/db_sql");

module.exports = {
  sidebar: async (req, res, next) => {
    const { user } = req.body;
    try {
      getConn((e, conn) => {
        if (e) return onSendingMsgError(e.message, req, res, 500, "sidebar");
        const sql = format(selectUser_id_all, user.id);
        conn.query(sql, (e, rows) => {
          if (e) return onSendingMsgError(e.message, req, res, 500, "sidebar");
          req.user = {
            name: user.name,
            major: user.major,
            path: rows[0].path
          };
          next();
        });
        conn.release();
      });
    } catch (sidebarError) {
      return onSendingMsgError(sidebarError.message, req, res, 500, "sidebar");
    }
  }
};
