const express = require("express");
const { getAllPayments, addNewPayment, updatePayment, deletePayment } = require("./payment.controller");
const { verifyTokenAndAdmin } = require("./../../middlewares/verifyToken")
const paymentRouter = express.Router();
const upload = require("./../../middlewares/multer")

paymentRouter.route("/")
    .get(getAllPayments)
    .post(verifyTokenAndAdmin, upload.single("image"),addNewPayment);

paymentRouter.route("/:id")
    .put(verifyTokenAndAdmin, updatePayment)
    .delete(verifyTokenAndAdmin, deletePayment);


module.exports = paymentRouter