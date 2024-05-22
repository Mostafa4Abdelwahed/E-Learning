const express = require("express");
const { verifyTokenAndAdmin, verifyToken } = require("./../../middlewares/verifyToken")
const { getAllCourses, addNewCourse, updateCourse, deleteCourse, getCourseBySlug, getCourseById, updateCourseImage } = require("./course.controller");
const courseRoute = express.Router();
const upload = require("../../middlewares/multer")


courseRoute.route("/")
    .get(getAllCourses)
    .post(verifyTokenAndAdmin, upload.single("image"), addNewCourse)


courseRoute.route("/:slug").get(getCourseBySlug)
courseRoute.route("/one/:id")
    .get(getCourseById)
    .put(verifyTokenAndAdmin, upload.single("image"), updateCourseImage)


courseRoute.route("/:id")
    .delete(verifyTokenAndAdmin, deleteCourse)
    .put(verifyTokenAndAdmin, updateCourse)


module.exports = courseRoute