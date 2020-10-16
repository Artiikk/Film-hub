// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
// Initialize connection to database
const dbUrl = process.env.DB_URL;
const dbOptions = { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, family: 4 };
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
export default mongoose.createConnection(dbUrl, dbOptions);;
