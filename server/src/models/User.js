// User model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email: {type: String, unique: true},
    password: String,
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'admin'
    },
    schoolName: String,    
    schoolId: {
     type: mongoose.Schema.Types.ObjectId,
    ref: "School"
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);