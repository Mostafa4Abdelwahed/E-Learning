const Joi = require("joi");
const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    CourseId:{
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    CourseName:{
        type: String
    },
    PaymentName:{
        type: String
    },
    Price: {
        type: Number
    },
    ImagePay:{
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    DescPay:{
        type: String
    },
    Status:{
        type: String,
        default: "Pending"
    }
},{timestamps: true});

const order = mongoose.model("order",orderSchema);

function validationCreateOrder(obj) {
    const schema = Joi.object({
        UserId: Joi.string().trim().required(),
        CourseId: Joi.string().trim().required(),
        CourseName: Joi.string().trim().required(),
        PaymentName: Joi.string().trim().required(),
        Price: Joi.string().trim().required(),
        DescPay: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    order,
    validationCreateOrder
}