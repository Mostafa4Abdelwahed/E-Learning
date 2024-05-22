const express = require('express')
const app = express()
const cors = require("cors")
const connectDB = require("./Database/connectDB")
const { errorHandler, notFound } = require('./src/middlewares/error')

require("dotenv").config()

// MiddleWares
app.use(express.json())
app.use(cors())

connectDB();

app.use("/api/auth",require('./src/modules/User/user.router'))
app.use("/api/level",require('./src/modules/Level/level.router'))
app.use("/api/course",require('./src/modules/Course/course.router'))
app.use("/api/session",require('./src/modules/Session/session.router'))
app.use("/api/payment",require('./src/modules/Payment/payment.router'))
app.use("/api/order",require('./src/modules/Order/order.router'))


// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Is Running in ${process.env.NODE_ENV} Mode In Port ${port}`))