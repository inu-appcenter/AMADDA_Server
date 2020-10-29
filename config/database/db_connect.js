var mysql = require("mysql");
var config = require("./db_config").dev;
var pool = mysql.createPool(config);

function getConnection(cb) {
  pool.getConnection((e, conn) => {
    cb(e, conn);
  });
}

module.exports = getConnection;
