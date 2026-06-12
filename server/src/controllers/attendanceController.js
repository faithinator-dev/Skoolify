// Attendance controller logic
const Attendance = require("../models/Attendance");

// MARK ATTENDANCE
exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ATTENDANCE
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("studentId");

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};