require('dotenv').config();
const jwt = {};
jwt.secret_key = process.env.APPCENTER_JWT_SECRET;
module.exports = jwt;
