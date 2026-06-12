// Subject model
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: String,

    className: String,

    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema);