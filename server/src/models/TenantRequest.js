const mongoose = require('mongoose');

const tenantRequestSchema = new mongoose.Schema({
    schoolName: { type: String, required: true },
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('TenantRequest', tenantRequestSchema);