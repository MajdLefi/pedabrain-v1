const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Database Error : ${err}`);
        process.exit(1);
    }
};

module.exports = connectDB;
