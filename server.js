
const express = require('express');
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require('./middleWare/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
connectDb();



const app = express();   
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts",contactRoutes);
app.use("/api/user",userRoutes);
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server running at port ${port} 🚀`);
});
