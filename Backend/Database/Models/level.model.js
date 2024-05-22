const Joi = require("joi");
const mongoose = require("mongoose")

const levelSchema = new mongoose.Schema({
    title:{
        type: String,
        min: [4,"Min Length 4 Letter"],
        max: [50,"Max Length 50 Letter"],
    },
    description:{
        type: String,
        min: [10,"Min Length 10 Letter"],
        max: [200,"Max Length 200 Letter"],
    },
    thumbnail:{
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    slug:{
        type: String,
        require: true
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

levelSchema.virtual("courses",{
    ref: "course",
    foreignField: "levelId",
    localField: "_id",
})

const level = mongoose.model("level",levelSchema);

function validationCreateLevel(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(4).max(50).required(),
        description: Joi.string().trim().min(10).max(200).required(),
        slug: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    level,
    validationCreateLevel
}