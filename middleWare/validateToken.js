const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authorizedHeader = req.headers.Authorization || req.headers.authorization;

    if (authorizedHeader && authorizedHeader.startsWith("Bearer")) {
        token = authorizedHeader.split(" ")[1]; // Fixed token assignment

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" }); // Proper error handling
            }

            req.user = decoded.user; // Attach decoded user info to request
            next(); // Allow request to proceed
            console.log(decoded);
            
        });
    } else {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
});

module.exports = validateToken;
