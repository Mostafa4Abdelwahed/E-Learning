const express = require("express")
const { verifyTokenAndAdmin, verifyToken } = require("./../../middlewares/verifyToken")
const { getAllSession, addNewSession, updateSession, deleteSession, getSessionBySlug, getSessionById } = require("./session.controller")
const sessionRouter = express.Router()

sessionRouter.route("/")
    .get(verifyToken,getAllSession)
    .post(verifyTokenAndAdmin, addNewSession)

sessionRouter.route("/:slug").get(getSessionBySlug)

sessionRouter.route("/one/:id")
    .get(verifyToken, getSessionById)
    .put(verifyTokenAndAdmin, updateSession)
    .delete(verifyTokenAndAdmin, deleteSession)



module.exports = sessionRouter