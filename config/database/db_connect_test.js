var mysql = require("mysql");
var config = require("./db_config").dev;
var pool = mysql.createPool(config);

function getConnection() {
  return new Promise(resolve => {
    pool.getConnection((e, conn) => {
      if (e) resolve(null);
      else resolve(conn);
    });
  });
}
module.exports = getConnection;
