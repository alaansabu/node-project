const express = require('express');
const dotenv = require('dotenv');
const contactRoutes = require("./routes/contactRoutes")

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts",contactRoutes);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
