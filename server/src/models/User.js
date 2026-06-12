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
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);