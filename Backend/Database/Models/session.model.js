const Joi = require("joi");
const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    title:{
        type: String,
        min: [4,"Min Length 4 Letter"],
        max: [50,"Max Length 50 Letter"],
    },
    shortDescription:{
        type: String
    },
    description:{
        type: String
    },
    videoUrl:{
        type: String,
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
},{timestamps: true})

const session = mongoose.model("session",sessionSchema);

function validationCreateSession(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(4).max(50).required(),
        shortDescription: Joi.string().trim().min(10).max(150).required(),
        description: Joi.string().trim().min(10).max(5000).required(),
        videoUrl: Joi.string().trim().min(10).max(200).required(),
        courseId: Joi.string().trim().required(),
        // slug: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    session,
    validationCreateSession
}