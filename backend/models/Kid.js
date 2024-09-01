const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const kidSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'firstName required']
        },
        lastName: {
            type: String,
            required: [true, 'lastName required']
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'parentId required'],
        },
        gender: {
            type: String,
            required: [true, 'gender required'],
            enum: ["male", "female"],
        },
        age: {
            type: Number,
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
            enum: ['kid',],
        },
    },
    { timestamps: true }
)

kidSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid