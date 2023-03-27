require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connetDB = require('./config/dbConn')
const mongoose = require('mongoose')
const {logger, logEvents} = require('./middleware/logger')


const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

//db connection
mongoose.set("strictQuery", false);
connetDB()

//middlewares
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}))
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser())

// routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/customers', require('./routes/customerRoutes'))
app.use('/categories', require('./routes/categoryRoutes'))
app.use('/warehouse', require('./routes/warehouseRoutes'))
app.use('/invoice', require('./routes/invoiceRoutes'))


//for resources that are not found (404)
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// error handler middleware
app.use(errorHandler)


//app listening
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log('err')
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

