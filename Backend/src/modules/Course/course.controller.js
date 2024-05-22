const asyncHandler = require("express-async-handler")
const { course, validationCreateCourse } = require("./../../../Database/Models/course.model");
const { default: slugify } = require("slugify");
const cloudinary = require("../../../utils/cloudinary")

module.exports.getAllCourses = asyncHandler(async (req, res) => {
    const Course_Per_Page = 9;
    const { pageNumber } = req.query;
    const data = await course.find().sort({ createdAt: -1 }).populate("levelId");
    const Total_Courses = data.length;
    const Total_Pages = Math.ceil(data.length / Course_Per_Page);

    if (pageNumber) {
        const data = await course.find()
            .sort({ createdAt: -1 })
            .populate("levelId")
            .skip((pageNumber - 1) * Course_Per_Page)
            .limit(Course_Per_Page);
        return res.json({ message: "success", data, Total_Courses, Total_Pages })
    }

    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data})
    }
    res.json({ message: "success", data, Total_Courses, Total_Pages })
})

module.exports.getCourseById = asyncHandler(async (req, res) => {
    const data = await course.findById(req.params.id).populate("sessions");
    if (!data) {
        return res.json({ message: "Not Found Data" })
    }
    res.json({ data })
})

module.exports.getCourseBySlug = asyncHandler(async (req, res) => {
    const data = await course.findOne({ slug: req.params.slug }).populate("sessions");
    if (!data) {
        return res.json({ message: "Not Found Data" })
    }
    res.json({ data })
})

module.exports.addNewCourse = asyncHandler(async (req, res) => {
    const { title, levelId } = req.body;
    const slugCourse = title + " " + levelId.substr(18, 24);
    const course_exist = await course.findOne({ title, levelId });

    if (!req.file) {
        return res.json({ message: "No Image Provide" })
    }

    if (course_exist) {
        return res.json({ message: "Course Already Exist" })
    }
    req.body.slug = slugify(slugCourse)

    const { error } = validationCreateCourse(req.body);
    if (error) {
        return res.json({ message: error.details[0].message })
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const newCourse = new course({
        title: req.body.title,
        price: req.body.price,
        levelId: req.body.levelId,
        thumbnail: {
            url: result.secure_url,
            publicId: result.public_id
        },
        slug: req.body.slug
    });
    await newCourse.save();
    res.json({ message: "Course Added Successfully", newCourse })
})

module.exports.deleteCourse = asyncHandler(async (req, res) => {
    const Course = await course.findById(req.params.id);

    // Delete Thumbnail From Cloudinary
    await cloudinary.v2.uploader.destroy(Course.thumbnail.publicId)

    const delCourse = await course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course Deleted Successfully" })
})

module.exports.updateCourse = asyncHandler(async (req, res) => {
    const { title, price, thumbnail, levelId } = req.body;
    const updtCourse = await course.findByIdAndUpdate(req.params.id, { title, price, thumbnail, levelId }, { new: true });
    res.json({ message: "Course Updated Successfully", updtCourse })
})

module.exports.updateCourseImage = asyncHandler(async (req, res) => {
    const Course = await course.findById(req.params.id);
    if (!Course) {
        return res.json({ message: "Not Found This Course" });
    } else if (!req.file) {
        return res.json({ message: "No Image Provide" });
    }

    await cloudinary.v2.uploader.destroy(Course.thumbnail.publicId);

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    await course.findByIdAndUpdate(req.params.id,{
        thumbnail: {
            url: result.secure_url,
            publicId: result.public_id
        }
    });

    res.json({message:"Image Updated Successfully"})

})