// express 라이브러리 사용법
const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const morgan = require("morgan");

// const db = require("../src/db/db.config.js");
const courseRouter = require("./router/course.router.js");
const studentRouter = require("./router/student.router.js");
const teacherRouter = require("./router/teacher.router.js");

// const cors
const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/course", courseRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.get("/", function (req, res) {
  res.send("server test");
});

app.listen(port, () => {
  console.log(`
          #############################################
          🛡️ Server listening on port: ${port} 🛡️
          #############################################  
      `);
});
