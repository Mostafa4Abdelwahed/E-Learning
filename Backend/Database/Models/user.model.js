const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 2,
        max: 12,
    },
    lastName: {
        type: String,
        min: 2,
        max: 12,
    },
    phoneNumber: {
        type: Number,
    },
    dadPhone: {
        type: Number,
    },
    region: {
        type: String
    },
    level: {
        type: String
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "course"
        }
    ],
    email: {
        type: String
    },
    password: {
        type: String,
        min: 6,
        max: 24
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.virtual("orders",{
    ref: "order",
    foreignField: "UserId",
    localField: "_id"
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
        id: this._id,
        name: this.name,
        isAdmin: this.isAdmin
    },process.env.SECRET_KEY)
}

const user = mongoose.model("user",userSchema);

module.exports = user