const express = require("express");
const { addNewUser, getAllUsers, deleteUser, updateUser, loginUser, getUserById, getCountUsers } = require("./user.controller");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndOnlyUser } = require("../../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.route("/users").get(verifyTokenAndAdmin, getAllUsers)

userRouter.route("/users/:id").get(verifyTokenAndOnlyUser, getUserById)

userRouter.route("/:id")
    .put(verifyTokenAndOnlyUser, updateUser)
    .delete(verifyTokenAndOnlyUser, deleteUser)

userRouter.post("/register", addNewUser)

userRouter.post("/login", loginUser)




module.exports = userRouter