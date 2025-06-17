const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: [true, "Please provide rating"],
        default: 0
    },
    title:{
        type: String,
        required: [true, "please provide title"],
        maxlength: [100, "The maximum number of characters allowed are 100"]
    },
    comment:{
        type: String,
        maxlength: [1000, "the maximum number of characters allowed are 1000"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: [true, "it is required to provide user ID"]
    },
    product:{
        type: mongoose.Types.ObjectId,
        required:[true, "it is required to provide product ID"]
    },   
},{
    timestamps:true
})

module.exports = mongoose.model("Review", reviewSchema)