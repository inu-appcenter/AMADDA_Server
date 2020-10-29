require('dotenv').config();

module.exports = (function () {
  return {
    local: {
      host: 'localhost',
    },
    dev: {
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      port: process.env.MARIADB_PORT,
      multipleStatements: true,
      connectionLimit: 150,
      multipleStatements: true,
    },
    // 오라클 db
    appCenter: {
      user: process.env.APPCENTER_USER,
      password: process.env.APPCENTER_PASSWORD,
      connectString: process.env.APPCENTER_CONNECTSTRING,
      poolMax: 8,
      poolMin: 1,
      poolIncrement: 1,
      poolTimeout: 60,
    },
    real: {},
  };
})();
