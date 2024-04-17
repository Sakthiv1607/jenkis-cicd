const mongoose = require('mongoose');
const User = require('./users.model');

// Define a schema for your data
const ticketsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: User,
        default: new mongoose.Types.ObjectId('65e182f83a0043a73af0f86e')
    },
    ticketId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
    },
    completedTime: {
        type: String,
        required: false,
        default: ''
    },
    completedBy: {
        type: String,
        required: false,
        default: ''
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdDT', updatedAt: 'updatedDT' }
});

// Create a Mongoose model based on the schema
const Tickets = mongoose.model('tickets', ticketsSchema);

module.exports = Tickets;
