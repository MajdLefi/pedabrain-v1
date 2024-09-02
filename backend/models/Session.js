const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const sessionSchema = new mongoose.Schema(
    {
        kidId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            required: [true, 'kidId required']
        },
       
        problem: {
            type: String,
        },
        sessionDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'done'],
        },
      
    },
    { timestamps: true }
);


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
