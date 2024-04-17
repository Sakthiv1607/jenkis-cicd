const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Define the possible values for the role field
        default: 'user' // Set the default value to 'user'
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdDT', updatedAt: 'updatedDT' }
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
