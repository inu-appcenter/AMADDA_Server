const multer = require("multer");
const fs = require("fs");
const { onSendingMsgError } = require("./logController");
const getConn = require("../config/database/db_connect");
const { updateUser_path_id } = require("../config/database/db_sql");
const format = require("mysql").format;
const { host } = require("../config/net");

const fileFilter = async function(req, file, cb) {
  req.nextMiddleware = true;
  req.fileError = false;
  req.DBError = false;
  req.tokenError = false;
  console.log(req.headers.id);

  try {
    getConn((e, conn) => {
      if (e) {
        req.DBError = true;
        cb(null, false);
      } else {
        let type = file.mimetype.split("/")[1];
        if (type == "jpg" || type == "png" || type == "jpeg" || type == "bmp" || type == "*") {
          const path = `${host}images/${req.headers.id}.png`;
          const sql = format(updateUser_path_id, [path, req.headers.id]);
          conn.query(sql, e => {
            if (e) {
              req.DBError = true;
              cb(null, false);
            } else {
              cb(null, true);
            }
          });
          conn.release();
        } else {
          req.fileError = true;
          cb(null, false); // false면 다음 옵션을 실행시키지 않음
        }
      }
    });
  } catch (imageError) {
    cb(imageError, false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload");
  },
  filename: async function(req, file, cb) {
    cb(null, `${req.headers.id}.png`);
  }
});
// fileFeilter가 먼저 실행되고 storage가 실행됨
const upload = multer({ fileFilter, storage });

module.exports = {
  uploadImage: () => upload.single("user_image"),

  imageDelete: async function(req, res, next) {
    try {
      fs.unlink(`./upload/${req.body.user.id}.png`, e => {
        if (e) return onSendingMsgError("no such file", req, res, 404);
        getConn((e, conn) => {
          if (e) return onSendingMsgError(e.message, req, res);
          const sql = format(updateUser_path_id, [null, req.body.user.id]);
          conn.query(sql, e => {
            if (e) return onSendingMsgError(e.message, req, res);
            next();
          });
          conn.release();
        });
      });
    } catch (imageDeleteError) {
      return onSendingMsgError(imageDeleteError.message, req, res);
    }
  }
};
