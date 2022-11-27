const express = require("express");
const courseController = require("../controller/course.controller.js");

const courseRouter = express.Router();

courseRouter.get("/", (req, res, next) => {
  res.send("course router test");
});

courseRouter.post("/create", courseController.create);

courseRouter.patch("/open/:id", courseController.updateOpen);

courseRouter.delete("/:id", courseController.delete);

courseRouter.patch("/", courseController.update);

module.exports = courseRouter;
