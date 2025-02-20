// @desc get all contacts
// route GET /api/contact
// @access public
const getContacts = (req, res) => {
    res.status(200).json({ message: "hi friends" });
}

// @desc create a contact
// route POST /api/contact
// @access public
const createContact = (req, res) => {
    res.status(201).json({ message: "Create contact" });
}

// @desc get individual contact
// route GET /api/contact/:id
// @access public
const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for individual ${req.params.id}` });
}

// @desc update a contact
// route PUT /api/contact/:id
// @access public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact ${req.params.id}` });
}

// @desc delete a contact
// route DELETE /api/contact/:id
// @access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact ${req.params.id}` });
}

module.exports = { getContact, createContact, getContacts, deleteContact, updateContact };
