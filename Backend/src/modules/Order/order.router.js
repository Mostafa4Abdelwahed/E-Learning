const express = require("express");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndOnlyUser } = require("./../../middlewares/verifyToken");
const { getAllOrders, addNewOrder, updateOrder, deleteOrder, orderActions, getCountOrders } = require("./order.controller");
const orderRouter = express.Router();
const upload = require("./../../middlewares/multer")

orderRouter.route("/")
    .get(verifyTokenAndAdmin, getAllOrders);


orderRouter.route("/:id")
    .post(verifyTokenAndOnlyUser, upload.single("image"), addNewOrder)
    .put(verifyTokenAndAdmin, updateOrder)
    .delete(verifyTokenAndAdmin, deleteOrder)

orderRouter.route("/:orderId/:courseId")
    .put(verifyTokenAndAdmin, orderActions);


module.exports = orderRouter