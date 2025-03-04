const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true],
    ref:"User"
    
    },
  name: {
    type: String,
    required: [true, "Please add contact name"]
  },
  gmail: {
    type: String,
    required: [true, "Please add gmail"]
  },
  phone: {
    type: String,
    required: [true, "Please add contact number"]
  }
}, {
  timestamps: true // ✅ Corrected spelling
});

module.exports = mongoose.model("Contact", contactSchema);
