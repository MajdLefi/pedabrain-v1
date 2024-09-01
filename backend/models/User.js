const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email required']
        },
        firstName: {
            type: String,
            required: [true, 'First name required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name required']
        },
        gender: {
            type: String,
            required: [true, 'Gender required'],
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
        status: {
            type: String,
            enum: ['active', 'banned'],
        },
        role: {
            type: String,
            enum: ['admin', 'kid', 'parent', 'teacher'],
        },
        password: {
            type: String,
            required: [true, 'Password required'],
            minlength: [6, 'Too short password']
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
        // Add the kids field
        kids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Kid'
            }
        ]
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
