const express = require("express"); // express framework
const app = express(); // express 사용
const favicon = require("serve-favicon");
const http = require("http").Server(app);
require("dotenv").config(); // .env 사용
const io = require("socket.io")(http); // socket.io 사용
const bodyParser = require("body-parser"); // body-parser 모듈
const { onStart, onSendingMsgError } = require("./controller/logController");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const oracledb = require("oracledb");
const appcenterDbConfig = require("./config/database/db_config").appCenter;

// 업로드 폴더 생성
const uploadDir = "upload";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 기초 셋팅
app.set("port", process.env.PORT);
app.set("ip");

// 미들웨어
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use((req, res, next) => {
  req.myUrl = req.url;
  onStart(`Prograssing..`, req);
  next();
});

// static 설정
app.use("/images", express.static("upload/"));

// 라우터
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const shareRouter = require("./routes/share");
const uploadRouter = require("./routes/upload");
const scheduleRouter = require("./routes/schedule");
const appConfigRouter = require("./routes/appConfig");
const timeTableRouter = require("./routes/timeTable");
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/share", shareRouter);
app.use("/image", uploadRouter);
app.use("/schedule", scheduleRouter);
app.use("/appconfig", appConfigRouter);
app.use("/time/table", timeTableRouter);

// 없는 경로
app.use((req, res) => onSendingMsgError("Not found", req, res, 404));

// 오라클 풀 만들고 서버 시작
oracledb.createPool(appcenterDbConfig, (err, pool) => {
  if (err) throw err;
  else {
    http.listen(app.get("port"), () => {
      console.log(`${app.get("port")}`);

      onStart("캘린더앱 서버 시작", { ip: "host", myUrl: "root" });
    });
  }
});
