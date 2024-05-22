const asyncHandler = require("express-async-handler");
const { level, validationCreateLevel } = require("./../../../Database/Models/level.model");
const { default: slugify } = require("slugify");
const cloudinary = require("../../../utils/cloudinary")


module.exports.getAllLevel = asyncHandler(async (req, res) => {
    const data = await level.find().sort({createdAt: -1});
    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data })
    }
    res.json({ data })
})

module.exports.getLevelBySlug = asyncHandler(async (req, res) => {
    const data = await level.findOne({ slug: req.params.slug }).populate("courses");
    if (!data) {
        return res.json({ messgae: "Not Found Data" })
    }
    res.json({ data })
})

module.exports.addNewLevel = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const findLevel = await level.findOne({ title: title });
    if (findLevel) {
        return res.json({ message: "Level Is Already Exist" })
    }
    req.body.slug = slugify(title)
    const { error } = validationCreateLevel(req.body)
    if (error) {
        return res.json({ message: error.details[0].message })
    }
    if (!req.file) {
        return res.json({ message: "No Image Provide" })
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path)


    const newLevel = new level({
        title: req.body.title,
        description: req.body.description,
        thumbnail: {
            url: result.secure_url,
            publicId: result.public_id
        },
        slug: req.body.slug
    });
    await newLevel.save();
    res.json({ message: "Level Added Successfully", newLevel })
})

module.exports.updateLevel = asyncHandler(async (req, res) => {
    const findLevel = await level.findById(req.params.id)
    if (!findLevel) {
        return res.json({ message: "Not Found Data" })
    }
    const updateLevel = await level.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Level Updated Successfully" })
})

module.exports.deleteLevel = asyncHandler(async (req, res) => {
    const Level = await level.findById(req.params.id);

    // Delete Thumbnail From Cloudinary
    await cloudinary.v2.uploader.destroy(Level.thumbnail.publicId)

    const delLevel = await level.findByIdAndDelete(req.params.id);
    res.json({ message: "Level Deleted Successfully" })
})

module.exports.updateLevelImage = asyncHandler(async (req, res) => {
    const Level = await level.findById(req.params.id);
    if (!Level) {
        return res.json({ message: "Not Found This Level" });
    }
    
    if (!req.file) {
        return res.json({ message: "No Image Provide" });
    }

    await cloudinary.v2.uploader.destroy(Level.thumbnail.publicId);

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    await level.findByIdAndUpdate(req.params.id,{
        thumbnail: {
            url: result.secure_url,
            publicId: result.public_id
        }
    });

    res.json({message:"Image Updated Successfully"})

})