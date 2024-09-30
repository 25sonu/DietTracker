const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
        // unique: true // Uncomment if you want to enforce uniqueness on age
    },
    admit_Date: {
        type: Date,
        required: true
    }
});

const Diet = mongoose.model('Diet', dietSchema);
module.exports = Diet; // Corrected here