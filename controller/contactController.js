const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

// @desc Get all contacts
// @route GET /api/contact
// @access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find(req.params.id);
    if(!contacts){

        res.status(404);
        throw new error("contact not found")
    }
    res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /api/contact
// @access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("📥 Incoming request:", req.body);

    const { name, gmail, phone } = req.body; // ❌ No "await" here!
    
    if (!name || !gmail || !phone) {
        console.log("❌ Validation failed: Missing fields");
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const contact = await Contact.create({ name, gmail, phone });

        console.log("✅ Contact saved:", contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error("❌ Error saving contact:", error.message);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});



// @desc Get individual contact
// @route GET /api/contact/:id
// @access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contact/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, // Updated data
        { new: true } // Return the updated document
    );

    res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contact/:id
// @access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await contact.deleteOne(); // Delete the contact
    res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = { getContact, createContact, getContacts, deleteContact, updateContact };
