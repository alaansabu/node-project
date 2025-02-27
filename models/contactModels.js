const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a contact name"]
    },
    gmail: {
        type: String,
        required: [true, "Please add Gmail"]
    },
    phone: {
        type: String,
        required: [true, "Please add a contact number"]
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Contact", contactSchema);
