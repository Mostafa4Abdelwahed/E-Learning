const asyncHandler = require("express-async-handler")
const { payment, validationCreatePayment } = require("./../../../Database/Models/payment.model")
const cloudinary = require("../../../utils/cloudinary")


module.exports.getAllPayments = asyncHandler(async (req, res) => {
    const data = await payment.find().sort({createdAt: -1});
    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data })
    }
    res.json({ message: "success", data })
})

module.exports.addNewPayment = asyncHandler(async (req, res) => {
    const { error } = validationCreatePayment(req.body)
    if (error) {
        return res.json({ message: error.details[0].message });
    }
    if (!req.file) {
        return res.json({ message: "No Image Provide" })
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const newPayment = new payment({
        name: req.body.name,
        details: req.body.details,
        logo: {
            url: result.secure_url,
            publicId: result.public_id
        }
    });
    await newPayment.save();
    res.json({ message: "Payment Added Successfully!!", newPayment })
})

module.exports.updatePayment = asyncHandler(async (req, res) => {
    const PaymentFound = await payment.findOne({ _id: req.params.id });
    if (!PaymentFound) {
        return res.json({ message: "Payment Not Found" })
    }
    const newPayment = await payment.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Payment Updated Successfully!!" });
})

module.exports.deletePayment = asyncHandler(async (req, res) => {
    const Payment = await payment.findById(req.params.id);

    // Delete Logo From Cloudinary
    await cloudinary.v2.uploader.destroy(Payment.logo.publicId)

    if (!Payment) {
        return res.json({ message: "Payment Not Found" })
    }
    const delPayment = await payment.findByIdAndDelete(req.params.id);
    res.json({ message: "Payment Deleted Successfully!!" });
})