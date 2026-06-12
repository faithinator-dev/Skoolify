// Teacher model
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    subjects: [
        {
            type: String
        }
    ],
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Teacher", teacherSchema);