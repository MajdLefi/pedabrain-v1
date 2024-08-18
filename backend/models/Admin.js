const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            unique: true,
            required: [true, 'Email required']
        },
        fullName: {
            type: String,
            trim: true,
            required: [true, 'fullName required']
        },
        role: {
            type: String,
            default: 'admin'
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

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin