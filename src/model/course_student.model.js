const db = require("../db/db.config.js");

function dbQueryAsync(query) {
	return new Promise((resolve, reject) => {
		db.query(query, (error, result) => {
			if (error) {
				reject(error);
			}
			resolve(result);
		});
	});
}

const Course_Student = function (cs) {
	this.course = cs.course_id;
	this.student = cs.student_id;
};

Course_Student.create = (newCS, result) => {
	// db.query(
	//     "SELECT * FROM course WHERE id = ?",newCS.course,(err,res)=>{
	//         if (err) {
	//             console.log("error: ", err);
	//             result({ message: "해당 teacher가 존재하지 않습니다." }, null);
	//             return;
	//           }

	//           if (res.length === 0) {
	//             // id 결과가 없을 시
	//             result({ message: "teacher not_found" }, null);
	//             return;
	//           }

	//     }
	// )

	return new Promise((resolve, reject) => {
		db.query(
			"SELECT * FROM course_student WHERE course = ? AND student = ?",
			[newCS.course, newCS.student],
			(err, res) => {
				if (err) {
					console.log("error: ", err);
					resolve({ message: "쿼리 작업중 에러발생" }, null);
					return;
				}

				if (res.length === 0) {
					db.query(
						"INSERT INTO course_student SET ?",
						newCS,
						(err, res) => {
							if (err) {
								if (err.errno === 1452) {
									resolve({
										message:
											"존재하지 않는 강의 또는 학생입니다.",
									});
									return;
								}
								console.log("error : ", err);
								resolve(err);
								return;
							}

							console.log("Created course_student: ", {
								id: res.insertId,
								...newCS,
							});
							resolve({ id: res.insertId, ...newCS });
						}
					);
				} else {
					resolve(
						{
							message: `${newCS.student}번 id 학생이 이미 수강중인 강의 입니다.`,
						},
						null
					);
					return;
				}
			}
		);
	});
};

module.exports = Course_Student;
