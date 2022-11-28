const express = require("express");
const courseController = require("../controller/course.controller.js");

const courseRouter = express.Router();

courseRouter.get("/", (req, res, next) => {
	res.send("course router test");
});

courseRouter.post("/create", courseController.create);

courseRouter.patch("/open/:id", courseController.updateOpen);

courseRouter.delete("/", courseController.delete);

courseRouter.patch("/", courseController.update);

courseRouter.get("/:id", courseController.findOne);

courseRouter.get("/list/:student_id", courseController.find);

module.exports = courseRouter;
