const express = require("express");
const router = express.Router();

const { registerUser, loginUser, showUser } = require("../controller/userController");
const validateToken = require("../middleWare/validateToken"); // Fixed folder naming

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Display current user details (Protected Route)
router.get("/show", validateToken, showUser);

module.exports = router;
