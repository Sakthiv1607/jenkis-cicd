const mongoose = require('mongoose');
const { MONGODB_URL } = process.env;
const connectDB = () => {
    mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB Atlas');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB Atlas:', error);
        });
}
module.exports = connectDB;