const express = require('express')
require('dotenv').config()
require('express-async-errors')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan = require('morgan')
//this is used of parsing the cookie that comes in the request
const cookieParser = require('cookie-parser')

//importing db file
const connectDB = require('./db/connect')

//this is the library which gives us the ability for file uploads
const fileUpload = require('express-fileupload')

const authRouter = require('./routes/authsRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

//cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const app = express()
app.use(fileUpload({useTempFiles: true}))
app.use(morgan('tiny'))
app.use(express.json())

app.use(express.static('./public'))

//adding cookie parser as middleware
//we are passing the JWT secret as sign
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/', (req, res) => {
    res.send('e-commerse api')
})


app.get('/api/v1', (req, res) => {
    

    //console.log(req.cookies)
    
    //signed cookies are avaliable under signed cookie 
    console.log(req.signedCookies)
    res.send("cookie is recived")
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)

//404 not found middleware
app.use(notFound)

//error handeling middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
        console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI);

        app.listen(port, () =>{
            console.log(` listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()