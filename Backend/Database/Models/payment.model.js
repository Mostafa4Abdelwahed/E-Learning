const Joi = require("joi");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name:{
        type: String
    },
    logo:{
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    details:{
        type: String
    },
},{timestamps: true})

const payment = mongoose.model("payment",paymentSchema)

function validationCreatePayment(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(50).required(),
        details: Joi.string().trim().min(20).max(250).required(),
    })
    return schema.validate(obj)
}

module.exports = {
    payment,
    validationCreatePayment
}