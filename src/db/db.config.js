const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "1234",
	port: +3306,
	database: "inflab",
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("Connected");

	const student = `CREATE TABLE student (
      id INT AUTO_INCREMENT PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      email VARCHAR(50) UNIQUE NOT NULL,
      nickname VARCHAR(255) NOT NULL
    );`;

	const teacher = `CREATE TABLE teacher (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        name VARCHAR(50) UNIQUE NOT NULL
        );`;

	const course = `CREATE TABLE course (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(255) DEFAULT NULL,
        category VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        open BOOLEAN DEFAULT 0,
        teacher INT NOT NULL,
        FOREIGN KEY(teacher) REFERENCES teacher(id)      
        )`;

	const course_student = `CREATE TABLE course_student (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        course INT NOT NULL,
        student INT NOT NULL,
        FOREIGN KEY(course) REFERENCES course(id),
        FOREIGN KEY(student) REFERENCES student(id) ON DELETE cascade
        )`;

	const insert_teacher = `INSERT INTO teacher (name) value ("황교수"), ("안교수"), ("박교수")`;

	// student
	connection.query(student, function (err, result) {
		if (err) {
			console.log("이미 student table이 존재합니다.");
		} else console.log("create table student ");
	});

	// teacher
	connection.query(teacher, function (err, result) {
		if (err) {
			console.log("이미 teacher table이 존재합니다.");
		} else {
			console.log("create table teacher ");
			// 강사를 테이블 생성단계에서 추가
			connection.query(insert_teacher, function (err, result) {
				if (err) {
					console.log("이미 해당 강사가 존재합니다.");
				} else console.log("강사 생성 성공");
			});
		}
	});

	// course
	connection.query(course, function (err, result) {
		if (err) {
			console.log("이미 course table이 존재합니다.");
		} else console.log("create table course ");
	});

	// course_student
	connection.query(course_student, function (err, result) {
		if (err) {
			console.log("이미 course_student table이 존재합니다.");
		} else console.log("create table course_student ");
	});
});

module.exports = connection;
