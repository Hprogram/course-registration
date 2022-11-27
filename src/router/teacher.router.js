const express = require("express");

const teacherRouter = express.Router();

teacherRouter.get("/", (req, res, next) => {
  res.send("teacher router test");
});

module.exports = teacherRouter;
