const express = require("express");
const studentController = require("../controller/student.controller.js");

const studentRouter = express.Router();

studentRouter.get("/", (req, res, next) => {
	res.send("student router test");
});

studentRouter.post("/create", studentController.create);

studentRouter.get("/:id", studentController.findOne);

studentRouter.delete("/", studentController.delete);

studentRouter.post("/enrolment", studentController.enrolment);

module.exports = studentRouter;
