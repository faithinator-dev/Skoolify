// Student controller logic
const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("subjects");

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};