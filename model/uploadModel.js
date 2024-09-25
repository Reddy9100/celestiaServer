const mongoose = require('mongoose');

// Define the schema for the form data
const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Telugu', 'English', 'Hindi', 'Malayalam', 'Tamil'], // Optional: Enum to restrict the category to these values
    },
    fileId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the file stored in GridFS
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model from the schema and export it
const FormData = mongoose.model('uploadData', formDataSchema);

module.exports = FormData;
