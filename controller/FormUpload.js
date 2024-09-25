// controllers/uploadController.js
const { upload, uploadToGridFS } = require('../utils/multer');
const connectDB = require('../config/dbConfig'); // Import connectDB here
const { GridFSBucket,ObjectId } = require('mongodb'); // Ensure you import GridFSBucket as well

// Upload form data and save file to GridFS
exports.uploadFormData = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'Multer error' });
        }

        // After multer uploads the file to a temporary location, call uploadToGridFS to save it to GridFS
        uploadToGridFS(req, res);
    });
};

// Get all songs from GridFS
exports.getSongs = async (req, res) => {
    try {
        const db = await connectDB(); // Connect to the database
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        // Fetch the list of files from GridFS
        const files = await db.collection('uploads.files').find({}).toArray();
        
        // Construct the file URLs for the audio files
        const fileUrls = files.map(file => ({
            id: file._id,
            filename: file.filename,
            url: `http://localhost:5000/files/${file._id}` // Make sure this endpoint serves the files correctly
        }));

        res.status(200).json(fileUrls);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Error fetching files' });
    }
};

// Serve files from GridFS
exports.getFile = async (req, res) => {
    try {
        const fileId = req.params.id; // Capture the requested file ID
        console.log(`Fetching file with ID: ${fileId}`); // Log the file ID for debugging

        const db = await connectDB(); // Connect to the database
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        // Convert string ID to ObjectId
        const objectId = new ObjectId(fileId);

        const downloadStream = bucket.openDownloadStream(objectId);

        downloadStream.on('error', () => {
            console.error('Download stream error:', fileId); // Log error details
            return res.status(404).send('File not found');
        });

        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Error fetching file');
    }
};