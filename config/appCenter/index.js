require('dotenv').config();

const appCenter = {};
appCenter.queryOptions = (uri = String, method = String, form = Object) => {
  return {
    url: `${process.env.APPCENTER_URL}/${uri}`,
    header: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    method,
    form,
    json: true,
  };
};
module.exports = appCenter;
