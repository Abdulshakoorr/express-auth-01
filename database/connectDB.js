const mongoose = require('mongoose');


const connectDB = async (DATA_BASE_URL) =>{
    try {
        await mongoose.connect(DATA_BASE_URL);
        console.log('connected to database');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB