const express = require("express");
const studentController = require("../controller/student.controller.js");

const studentRouter = express.Router();

studentRouter.post("/create", studentController.create);

studentRouter.get("/", studentController.findOne);

studentRouter.delete("/", studentController.delete);

studentRouter.post("/enrolment", studentController.enrolment);

module.exports = studentRouter;
