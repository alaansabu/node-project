const express = require('express');
const router = express.Router();
const {getContact,
     createContact,
     deleteContact,
     getContacts,
     updateContact} =  require("../controller/contactController")
// get
router.route("/").get(getContacts).post(createContact);

//get individual
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


module.exports = router;

