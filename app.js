const express = require('express');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
  origin: '*', // Or replace with specific domain
}));

app.use(uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});