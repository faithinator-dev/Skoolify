// User model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email: {type: String, unique: true},
    password: String,
    role: {
        type: String,
        enum: ['super_admin', 'school_admin', 'teacher', 'student'],
        default: 'school_admin'
    },
    schoolName: String,    
    schoolId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "School",
     required: false // Super admins don't have a schoolId
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);