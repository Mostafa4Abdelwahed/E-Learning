const asyncHandler = require("express-async-handler")
const {session, validationCreateSession} = require("./../../../Database/Models/session.model")
const { default: slugify } = require("slugify")

module.exports.getAllSession = asyncHandler(async (req, res)=>{
    const data = await session.find().sort({createdAt: -1}).populate("courseId")
    if (data.length === 0) {
        return res.json({message:"Not Found Data", data})
    }
    res.json({data})
})

module.exports.getSessionBySlug = asyncHandler(async (req, res)=>{
    const data = await session.findOne({slug: req.params.slug})
    if (!data) {
        return res.json({message:"Not Found Data"})
    }
    res.json({data})
})

module.exports.getSessionById = asyncHandler(async (req, res)=>{
    const data = await session.findOne({_id: req.params.id})
    if (!data) {
        return res.json({message:"Not Found Data"})
    }
    res.json({data})
})

module.exports.addNewSession = asyncHandler(async (req, res)=>{
    const {title, courseId} = req.body;
    // const slugSession = title + " " + courseId.substr(18,24);
    const session_exist = await session.findOne({title,courseId});
    if(session_exist){
        return res.json({message:"Session Already Exist"})
    }
    const {error} = validationCreateSession(req.body);
    if(error){
        return res.json({message: error.details[0].message})
    }
    const  newSession = new session(req.body);
    await newSession.save();
    res.json({message:"Session Added Successfully",newSession})
})

module.exports.updateSession = asyncHandler(async (req, res)=>{
    const {title, videoUrl, courseId} = req.body;
    const updtSession = await session.findByIdAndUpdate(req.params.id,{title,videoUrl,courseId},{new:true})
    res.json({message:"Course Updated Successfully",updtSession})
})

module.exports.deleteSession = asyncHandler(async (req, res)=>{
    const delSession = await session.findByIdAndDelete(req.params.id);
    res.json({message:"Session Deleted Successfully"})
})