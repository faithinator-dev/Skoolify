// School model
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: String,

  phone: String,

  email: String,

  subscriptionPlan: {
    type: String,
    default: "free",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("School", schoolSchema);