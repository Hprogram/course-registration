const Student = require("../model/student.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "추가할 데이터가 입력되지 않았습니다.",
    });
  }

  const student = new Student({
    email: req.body.email,
    nickname: req.body.nickname,
  });

  Student.create(student, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error creating Student.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id가 입력되지 않았습니다.",
    });
  }
  Student.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Student.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found student with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message + " id: " + req.params.id ||
            "Could not delete student with id " + req.params.id,
        });
      }
    } else res.send({ message: `student was deleted successfully!` });
  });
};
