const express = require("express");

const router = express.Router();
const {registerUser,loginUser,showUser} = require("../controller/userController")
// register
router.post("/register",registerUser);

//login
router.post("/login" ,loginUser);

//display currrent details
router.get("/show" ,showUser);

module.exports = router ; 