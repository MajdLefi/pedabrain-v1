const fs = require('fs');
require('colors');
const Booking = require('../../models/Booking');
const dotenv = require('dotenv')
dotenv.config({ path: '../../config/.env' })
const connectDB = require('../../config/connectDB');

connectDB();

const bookings = JSON.parse(fs.readFileSync('./bookings.json'));

const insertData = async () => {
    try {
        await Booking.create(bookings)
        console.log('Bookings created'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error)
    }
}

const destroyData = async () => {
    try {
        await Booking.deleteMany()
        console.log('Bookings deleted'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '-i') {
    insertData()
} else if (process.argv[2] === '-d') {
    destroyData()
} 