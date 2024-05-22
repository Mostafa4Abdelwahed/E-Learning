const asyncHandler = require("express-async-handler")
const { order, validationCreateOrder } = require("./../../../Database/Models/order.model")
const cloudinary = require("../../../utils/cloudinary")
const user = require("../../../Database/Models/user.model");


module.exports.getAllOrders = asyncHandler(async (req, res) => {
    const Order_Per_Page = 10;
    const { pageNumber } = req.query;
    const data = await order.find().sort({createdAt: -1}).populate("UserId");
    const Total_Orders = data.length;
    const Total_Pages = Math.ceil(data.length / Order_Per_Page);

    if (pageNumber) {
        const data = await order.find()
            .sort({createdAt: -1})
            .populate("UserId")
            .skip((pageNumber - 1) * Order_Per_Page)
            .limit(Order_Per_Page);
        return res.json({ message: "success", data, Total_Orders,Total_Pages })
    }

    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data })
    }
    res.json({message: "success", data, Total_Orders, Total_Pages})
})

module.exports.addNewOrder = asyncHandler(async (req, res) => {
    req.body.UserId = req.params.id;
    const { error } = validationCreateOrder(req.body)
    if (error) {
        return res.json({ message: error.details[0].message });
    }

    if (!req.file) {
        return res.json({ message: "No Image Provide" })
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path)


    const newOrder = new order({
        UserId: req.params.id,
        CourseId: req.body.CourseId,
        CourseName: req.body.CourseName,
        PaymentName: req.body.PaymentName,
        Price: req.body.Price,
        ImagePay: {
            url: result.secure_url,
            publicId: result.public_id
        },
        DescPay: req.body.DescPay,
    });
    await newOrder.save();
    res.json({ message: "Order Added Successfully", newOrder })
})

module.exports.updateOrder = asyncHandler(async (req, res) => {
    const OrderFound = await order.findOne({ _id: req.params.id });
    if (!OrderFound) {
        return res.json({ message: "Order Not Found" })
    }
    const newOrder = await order.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Order Updated Successfully" });
})

module.exports.deleteOrder = asyncHandler(async (req, res) => {
    const OrderFound = await order.findOne({ _id: req.params.id });
    if (!OrderFound) {
        return res.json({ message: "Order Not Found" })
    }
    const delOrder = await order.findByIdAndDelete({ _id: req.params.id });
    res.json({ message: "Order Deleted Successfully!!" });
})

module.exports.orderActions = asyncHandler(async (req, res) => {
    if (req.body.Status === "Accepted") {
        const User = await user.findById(req.body.userId);
        User.courses.push(req.params.courseId);
        await User.save();
        const Order = await order.findByIdAndUpdate(req.params.orderId, {
            Status: "Accepted"
        });
        return res.json({ message: "Order Accepted Sucsessfully" })
    } else if (req.body.Status === "Rejected") {
        const Order = await order.findByIdAndUpdate(req.params.orderId, {
            Status: "Rejected"
        });
        return res.json({ message: "Order Rejected Sucsessfully" })
    }
})