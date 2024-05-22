const Joi = require("joi");
const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        min: [4,"Min Length 4 Letter"],
        max: [100,"Max Length 50 Letter"],
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    levelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "level",
        require: true,
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
        require: true,
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

courseSchema.virtual("sessions",{
    ref: "session",
    foreignField: "courseId",
    localField: "_id"
})


const course = mongoose.model("course",courseSchema);

function validationCreateCourse(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(4).max(100).required(),
        price: Joi.number().required(),
        levelId: Joi.string().trim().required(),
        slug: Joi.string().trim().required(),
    })
    return schema.validate(obj)
}

module.exports = {
    course,
    validationCreateCourse
}