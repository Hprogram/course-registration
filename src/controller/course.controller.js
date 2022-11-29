const Course = require("../model/course.model.js");

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "추가할 데이터가 입력되지 않았습니다.",
		});
	}

	const course = new Course({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		// open :req.body.open
		teacher: req.body.teacher,
	});

	Course.create(course, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "error creating Student.",
			});
		} else {
			res.status(201).send(data);
		}
	});
};

exports.update = (req, res) => {
	if (!req.body.id) {
		res.status(400).send({
			message: "id가 입력되지 않았습니다.",
		});
	}

	Course.updateByID(req.body.id, req.body, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course  with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						err.message ||
						"Error retrieving Course with id " + req.params.id,
				});
			}
		} else res.send(data);
	});
};

exports.updateOpen = (req, res) => {
	if (!req.body.id) {
		res.status(400).send({
			message: "id가 입력되지 않았습니다.",
		});
	}
	Course.openByID(req.body.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course  with id ${req.body.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						err.message ||
						"Error retrieving Course with id " + req.body.id,
				});
			}
		} else res.send(data);
	});
};

exports.delete = (req, res) => {
	Course.remove(req.body.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found course with id ${req.body.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						err.message + " id: " + req.body.id ||
						"Could not delete course with id " + req.body.id,
				});
			}
		} else {
			res.send({ message: `course was deleted successfully!` });
		}
	});
};

exports.findOne = (req, res) => {
	Course.findOneByID(req.query.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course findOne with id ${req.query.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving Course findOne with id " +
						req.query.id,
				});
			}
		} else {
			let result = [];

			data.map((el) => {
				if (result.length === 0) {
					el.student_count = 1;
					el.students = [
						{
							nickname: el.nickname,
							created_at: el.cs_created_at,
						},
					];
					el.open = el.open === 0 ? false : true;

					delete el.nickname;
					delete el.cs_created_at;

					result.push(el);
				} else {
					result[0].student_count += 1;
					result[0].students.push({
						nickname: el.nickname,
						created_at: el.cs_created_at,
					});
				}
			});

			res.send(result[0]);
		}
	});
};

exports.find = async (req, res) => {
	if (req.query.student_id && !req.query.course && !req.query.teacher) {
		await this.findStudent(req, res);
	} else if (
		req.query.course &&
		!req.query.student_id &&
		!req.query.teacher
	) {
		await this.findCourse(req, res);
	} else if (
		req.query.teacher &&
		!req.query.student_id &&
		!req.query.course
	) {
		await this.findTeacher(req, res);
	} else {
		res.send({
			error: "강의명/ 강사명/ 수강생 ID 중 한가지 값만 입력해주세요.",
		});
	}
};

exports.defaultFind = async (req, res) => {
	let result = [];

	const resData = await Course.find();

	if (resData.length <= 0) {
		res.status(404).send("강의가 존재하지 않습니다.");
	}

	await Promise.all(
		resData.map((el) => {
			const key = result.filter((k) => {
				return el.id === k.id;
			})[0];

			if (!key) {
				el.student_count = 1;
				result.push(el);
			} else {
				key.student_count += 1;
			}
		})
	);

	const list = result.filter((el) => {
		return el.open === 1;
	});

	const divisions = await division(
		list,
		req.query.page_count,
		req.query.page_number,
		req.query.category
	).then(async (data) => {
		data.list = await DeletestudentId(data.list);

		return data;
	});

	res.send(divisions);
};

exports.findStudent = async (req, res) => {
	// if (!req.params.student_id) {
	// 	res.status(500).send("")
	// }
	let result = [];

	const resData = await Course.find();

	if (resData.length <= 0) {
		res.status(404).send("강의가 존재하지 않습니다.");
	}

	await Promise.all(
		resData.map((el) => {
			const key = result.filter((k) => {
				return el.id === k.id;
			})[0];

			if (!key) {
				el.student_count = 1;
				result.push(el);
			} else {
				key.student_count += 1;
			}
		})
	);

	const list = result.filter((el) => {
		return el.open === 1 && el.student_id === Number(req.query.student_id);
	});

	const divisions = await division(
		list,
		req.query.page_count,
		req.query.page_number,
		req.query.category
	).then(async (data) => {
		data.list = await DeletestudentId(data.list);
		return data;
	});

	res.send(divisions);
};

exports.findTeacher = async (req, res) => {
	let result = [];

	const resData = await Course.find();

	if (resData.length <= 0) {
		res.status(404).send("강의가 존재하지 않습니다.");
	}

	await Promise.all(
		resData.map((el) => {
			const key = result.filter((k) => {
				return el.id === k.id;
			})[0];

			if (!key) {
				el.student_count = 1;
				result.push(el);
			} else {
				key.student_count += 1;
			}
		})
	);

	const list = result.filter((el) => {
		return el.open === 1 && el.teacher === req.query.teacher;
	});

	const divisions = await division(
		list,
		req.query.page_count,
		req.query.page_number,
		req.query.category
	).then(async (data) => {
		data.list = await DeletestudentId(data.list);
		return data;
	});

	res.send(divisions);
};

exports.findCourse = async (req, res) => {
	let result = [];

	const resData = await Course.find();

	if (resData.length <= 0) {
		res.status(404).send("강의가 존재하지 않습니다.");
	}

	await Promise.all(
		resData.map((el) => {
			const key = result.filter((k) => {
				return el.id === k.id;
			})[0];

			if (!key) {
				el.student_count = 1;
				result.push(el);
			} else {
				key.student_count += 1;
			}
		})
	);

	const list = result.filter((el) => {
		return el.open === 1 && el.name === req.query.course;
	});

	const divisions = await division(
		list,
		req.query.page_count,
		req.query.page_number,
		req.query.category
	).then(async (data) => {
		data.list = await DeletestudentId(data.list);
		return data;
	});

	res.send(divisions);
};

async function division(list, n, page_number, category) {
	if (!n) {
		n = 5;
	}

	if (category) {
		list = list.filter((el) => {
			return el.category === category;
		});
	}

	const tmp = [];
	const len = list.length;
	const cnt = Math.ceil(len / n);
	for (let i = 0; i <= cnt; i++) {
		// console.log(list[i]);
		tmp.push(list.splice(0, n));
	}

	if (page_number && page_number <= cnt + 1 && page_number >= 1) {
		return {
			list: tmp[page_number - 1],
			current_page: page_number,
			total_page: cnt,
		};
	} else {
		return {
			list: tmp[0],
			current_page: 1,
			total_page: cnt,
		};
	}
}

async function DeletestudentId(list) {
	const data = list.map((el) => {
		delete el.student_id;
		return el;
	});
	return data;
}
