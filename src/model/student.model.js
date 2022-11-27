const db = require("../db/db.config.js");

const Student = function (student) {
  this.email = student.email;
  this.nickname = student.nickname;
};

Student.create = (newStudent, result) => {
  db.query("INSERT INTO student SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("Created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.remove = (studentID, result) => {
  db.query("SELECT * FROM student WHERE id = ?", studentID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length === 0) {
      // id 결과가 없을 시
      result({ message: "student not_found" }, null);
      return;
    }

    db.query("DELETE FROM student WHERE id = ?", studentID, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length === 0) {
        // id 결과가 없을 시
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted student with id: ", studentID);
      result(null, res);
    });
  });
};

Student.findByID = (studentID, result) => {
  db.query("SELECT * FROM student WHERE id = ?", studentID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Student;
