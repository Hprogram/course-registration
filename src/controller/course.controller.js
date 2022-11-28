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
	Course.findOneByID(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course findOne with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving Course findOne with id " +
						req.params.id,
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

exports.find = (req, res) => {
	Course.findByStudentID(req.params.student_id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Course findOne with id ${req.params.id}.`,
				});
			} else {
				res.status(500).send({
					message:
						"Error retrieving Course findOne with id " +
						req.params.id,
				});
			}
		} else {
			res.send(data);
		}
	});
};
