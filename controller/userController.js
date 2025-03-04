const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
// @desc Register user
// @route POST /api/contact/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, password, gmail } = req.body;

    if (!userName || !gmail || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if the user already exists
    const userAvailable = await User.findOne({ gmail });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create User
   
    const newUser =await User.create({
        userName,
        password:hashedPassword ,
        gmail
    })

console.log(`user creted succesfully ${newUser}`);
if(newUser){

res.status(201).json({
    id:newUser.id,
    gmail:newUser.gmail
})

}else {

    res.status(400);
    throw new Error("validation error")

}

});

// @desc Login user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { gmail, password } = req.body;

    // Check if fields are missing
    if (!gmail || !password) {
        res.status(400);
        throw new Error("Both email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ gmail });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const accessToken = jwt.sign(
            {
                user: {
                    userName: user.userName,
                    gmail: user.gmail,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN, // ✅ Fixed Typo
            { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc Show user
// @route GET /api/contact/show
// @access Public
const showUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, showUser };