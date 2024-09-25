// db.js
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://reddysai:swyft@cluster0.ekusftb.mongodb.net/celestia?retryWrites=true&w=majority&appName=Cluster0';

let db;

const connectDB = async () => {
    if (!db) {
        const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
        await client.connect();
        db = client.db(); // Use the default database from the URI
        console.log('MongoDB connected');
    }
    return db;
};

module.exports = connectDB;
