const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            unique: true,
            required: [true, 'Email required']
        },
        firstName: {
            type: String,
            required: [true, 'firstName required']
        },
        firstName: {
            type: String,
            required: [true, 'lastName required']
        },
        gender: {
            type: String,
            required: [true, 'gender required'],
            enum: ["male", "female"],
        },
        birthday: {
            type: Date,
        },
        location: {
            type: String,
        },
        phone: {
            type: String,
        },
        problem: {
            type: String,
        },
        role: {
            type: String,
            enum: ['admin', 'student', 'parent'],
        },
        password: {
            type: String,
            required: [true, 'password required'],
            minlength: [6, 'Too short password']
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User