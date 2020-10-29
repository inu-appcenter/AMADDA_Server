const ip = require('ip');
require('dotenv').config(); // .env 사용

module.exports = {
  host: `http://${ip.address()}:${process.env.PORT}/`,
  ip: ip.address(),
};
