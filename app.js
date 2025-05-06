const express = require('express')
require('dotenv').config()
require('express-async-errors')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan = require('morgan')

//importing db file
const connectDB = require('./db/connect')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('e-commerse api')
})

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