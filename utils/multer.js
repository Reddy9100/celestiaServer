// utils/multer.js
const multer = require('multer');
const connectDB = require('../config/dbConfig');
const { GridFSBucket } = require('mongodb');

// Create multer storage with memory storage
const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({ storage }).single('file');

const uploadToGridFS = async (req, res) => {
    const db = await connectDB();
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' }); // Specify the bucket name

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer); // Upload the file buffer to GridFS

    uploadStream.on('finish', () => {
        res.status(200).json({
            message: 'File uploaded successfully',
            fileId: uploadStream.id,
        });
    });

    uploadStream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
    });
};

module.exports = { upload, uploadToGridFS };
