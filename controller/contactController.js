const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });

    if (!contacts || contacts.length === 0) {
        res.status(404);
        throw new Error("No contacts found");
    }

    res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("📥 Incoming request:", req.body);

    const { name, gmail, phone } = req.body;
    
    if (!name || !gmail || !phone) {
        console.log("❌ Validation failed: Missing fields");
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const contact = await Contact.create({ 
            name, 
            gmail, 
            phone, 
            user_id: req.user.id // ✅ Ensure contact is linked to user
        });

        console.log("✅ Contact saved:", contact);
        res.status(201).json(contact);
    } catch (error) {
        console.error("❌ Error saving contact:", error.message);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// @desc Get individual contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found or unauthorized");
    }

    res.status(200).json(contact);
});

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found or unauthorized");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id,});
    // user_id: req.user.id 

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found or unauthorized");
    }

    await contact.deleteOne(); 
    res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = { getContact, createContact, getContacts, deleteContact, updateContact };
