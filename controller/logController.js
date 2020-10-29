const logger = require("../config/log/log_config");
const myRes = require("../util/myResponse");

module.exports = {
  onStart: (msg = String, req = Object) => {
    logger.info(`${req.ip}:${req.myUrl}   ${msg}`);
  },
  onSendingMsgError: (
    msg = String,
    req = Object,
    res = Object,
    code = 500,
    dataname = "data",
    data = null
  ) => {
    let m = `${req.ip}:${req.myUrl}    Error:${msg}`;
    logger.error(m);
    res.status(code).json(myRes(false, msg, data, dataname));
  }
};
