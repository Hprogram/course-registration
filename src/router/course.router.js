const express = require("express");
const courseController = require("../controller/course.controller.js");

const courseRouter = express.Router();

courseRouter.post("/create", courseController.create);

courseRouter.patch("/open", courseController.updateOpen);

courseRouter.delete("/", courseController.delete);

courseRouter.patch("/", courseController.update);

courseRouter.get("/", courseController.findOne);

courseRouter.get("/list", courseController.find);

module.exports = courseRouter;
