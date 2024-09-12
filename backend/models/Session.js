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
            required: [true, 'problem required']
        },
        doctor: {
            type: String,
            required: [true, 'doctor required']
        },
        sessionDate: {
            type: Date,
            required: [true, 'sessionDate required']
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'done'],
            required: [true, 'status required']
        },
        testSkills: {
            type: String,
        },
        testObservations: {
            type: String,
        },
        sessionPlan: {
            type: String,
        },

    },
    { timestamps: true }
);


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
