const express = require('express');
const { uploadFormData, getSongs, getFile } = require("../controller/FormUpload");
const router = express.Router();

// Route for uploading files
router.post('/upload', uploadFormData);

// Route for fetching songs
router.get('/songs', getSongs);

// Route for serving files
router.get('/files/:id', getFile);

module.exports = router;
