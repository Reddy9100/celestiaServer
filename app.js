const express = require('express');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/routes');
const cors = require("cors")
const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: "*",
}))
app.use(uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});