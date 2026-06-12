// Score model
const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    },
    
    testScore: {
        type: Number,
        default: 0
    },
    examScore: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },

    grade: {
        type: String,
        default: "N/A"
    },

    term: {
        type: String,
        default: 'Term 1'
    }
}, {timestamps: true});

module.exports = mongoose.model("Score", scoreSchema);