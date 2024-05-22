const express = require("express")
const { getAllLevel, addNewLevel, deleteLevel, updateLevel, getLevelBySlug, updateLevelImage } = require("./level.controller")
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken")
const levelRoute = express.Router()
const upload = require("./../../middlewares/multer")

levelRoute.route("/")
    .get(getAllLevel)
    .post(verifyTokenAndAdmin, upload.single("image") ,addNewLevel)

levelRoute.route("/:slug").get(getLevelBySlug)

levelRoute.route("/:id")
    .delete(verifyTokenAndAdmin, deleteLevel)
    .put(verifyTokenAndAdmin, updateLevel)

levelRoute.route("/one/:id")
    .put(verifyTokenAndAdmin, upload.single("image"), updateLevelImage)

module.exports = levelRoute