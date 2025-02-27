const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

// @desc Get all contacts
// @route GET /api/contact
// @access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// @desc Create a contact
// @route POST /api/contact
// @access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("The requested body is", req.body);

    const { name, gmail, phone } = req.body;

    if (!name || !gmail || !phone) {
        res.status(400).json({ message: "The request body is empty" });
        return; 
    }

    const contact = await Contact.create({
        name,
        gmail,
        phone
    });

    res.status(201).json(contact);
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
