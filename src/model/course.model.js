const db = require("../db/db.config.js");

const Course = function (course) {
  this.name = course.name;
  this.description = course.description;
  this.price = course.price;
  this.category = course.category;
  //   this.open = course.open;
  this.teacher = course.teacher;
};

Course.create = (newCourse, result) => {
  db.query(
    "SELECT * FROM teacher WHERE id = ?",
    newCourse.teacher,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ message: "해당 teacher가 존재하지 않습니다." }, null);
        return;
      }

      if (res.length === 0) {
        // id 결과가 없을 시
        result({ message: "teacher not_found" }, null);
        return;
      }

      db.query("INSERT INTO course SET ?", newCourse, (err, res) => {
        if (err) {
          console.log("error : ", err);
          result(err, null);
          return;
        }

        console.log("Created course: ", { id: res.insertId, ...newCourse });
        result(null, { id: res.insertId, ...newCourse });
      });
    }
  );
};

Course.multiCreate = (newCourse, result) => {
  let bindVariables = "";
  let queryArray = [];

  queryArray = newCourse.flat();

  newCourse.forEach((item, index) => {
    if (newCourse.length === index + 1) {
      bindVariables += `(?, ?, ?, ?, ?, ?, '-')`;
    } else {
      bindVariables += `(?, ?, ?, ?, ?, ?, '-'), `;
    }
  });

  const queryString = `INSERT INTO course (name, description, open, price, category, teacher) VALUES ${bindVariables}`;

  db.query(queryString, [...queryArray], (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    // console.log("Created course: ", { id: res.insertId, ...newCourse });
    result(null, { message: "bulk insert success" });
  });
};

Course.updateByID = (id, course, result) => {
  db.query(
    "UPDATE course SET name = ?, description = ?, price = ? WHERE id = ?",
    [course.name, course.description, course.price, id],
    (err, res) => {
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

      console.log("update course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.openByID = (id, result) => {
  db.query("SELECT * FROM course WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ message: "해당 course 존재하지 않습니다." }, null);
      return;
    }

    if (res.length === 0) {
      // id 결과가 없을 시
      result({ message: "해당 course 존재하지 않습니다." }, null);
      return;
    }

    db.query("UPDATE course SET open = ? WHERE id = ?", [1, id], (err, res) => {
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

      console.log("update open course: ", { id: id, ...res });
      result(null, { id: id, message: `${id}번 강의 공개 처리 완료` });
    });
  });
};

Course.remove = (id, result) => {
  db.query("SELECT * FROM course WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ message: "해당 course 존재하지 않습니다." }, null);
      return;
    }

    if (res.length === 0) {
      // id 결과가 없을 시
      result({ message: "해당 course 존재하지 않습니다." }, null);
      return;
    }

    db.query("DELETE FROM course WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        throw err;
      }

      if (res.length === 0) {
        // id 결과가 없을 시
        result({ message: "course not_found" }, null);
        return;
      }

      console.log("deleted course with id: ", id);
      result(null, res);
    });
  });
};

module.exports = Course;
