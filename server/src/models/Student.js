// Student model
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,

  lastName: String,

  className: String,

  gender: String,

  admissionNumber: String,

  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);