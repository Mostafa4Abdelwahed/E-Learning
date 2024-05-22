const asyncHandler = require("express-async-handler");
const user = require("../../../Database/Models/user.model");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = asyncHandler(async (req, res) => {
    const User_Per_Page = 10;
    const { pageNumber } = req.query;
    const data = await user.find().sort({createdAt: -1}).populate("courses");
    const Total_Users = data.length;
    const Total_Pages = Math.ceil(data.length / User_Per_Page);

    if (pageNumber) {
        const data = await user.find()
            .sort({createdAt: -1})
            .populate("courses")
            .skip((pageNumber - 1) * User_Per_Page)
            .limit(User_Per_Page);
        return res.json({ message: "success", data, Total_Users, Total_Pages })
    }

    if (data.length === 0) {
        return res.json({ messgae: "Not Found Data", data })
    }
    res.json({ message: "success", data, Total_Users, Total_Pages })
})

module.exports.getUserById = asyncHandler(async (req, res) => {
    const data = await user.findOne({ _id: req.params.id }).populate("orders courses");
    if (!data) {
        return res.json({ message: "Not Found Data" })
    }
    res.json({ data })
})

module.exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
        return res.status(404).json({ message: "Email or Password Is Wrong" })
    }

    const isPassMatch = bcrypt.compareSync(password, User.password)
    if (!isPassMatch) {
        return res.status(404).json({ message: "Email or Password Is Wrong" })
    }
    const token = User.generateAuthToken();
    res.json({
        id: User._id,
        name: User.firstName,
        isAdmin: User.isAdmin,
        token
    })
})

module.exports.addNewUser = asyncHandler(async (req, res) => {
    const email_exist = await user.findOne({ email: req.body.email });
    const phone_exist = await user.findOne({ phoneNumber: req.body.phoneNumber });
    if (email_exist || phone_exist) {
        return res.status(404).json({ message: "Email Or Phone Number Already Exist" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        dadPhone: req.body.dadPhone,
        region: req.body.region,
        level: req.body.level,
        email: req.body.email,
        password: hashPass,
    });
    await newUser.save()
    res.json({ message: "Register Successfully :)" })
})

module.exports.updateUser = asyncHandler(async (req, res) => {
    const email_exist = await user.findOne({ _id: req.params.id });
    if (!email_exist) {
        return res.status(404).json({ message: "This User Not Found" })
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hashSync(req.body.password, salt);
    await user.findByIdAndUpdate(req.params.id, req.body)
    res.json({ messgae: "User Updated Successfully" })

})

module.exports.deleteUser = asyncHandler(async (req, res) => {
    const email_exist = await user.findOne({ _id: req.params.id });
    if (!email_exist) {
        return res.json({ message: "This User Not Found" })
    }
    const delUser = await user.findByIdAndDelete(req.params.id)
    res.json({ messgae: "User Deleted Successfully" })
})