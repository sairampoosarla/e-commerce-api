const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        required: [true, "Please provide rating"],
        min:1,
        max:5,
        default: 0
    },
    title:{
        type: String,
        trim: true,
        required: [true, "please provide title"],
        maxlength: [100, "The maximum number of characters allowed are 100"]
    },
    comment:{
        type: String,
        required: [true, "please provide comment"],
        //maxlength: [1000, "the maximum number of characters allowed are 1000"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "it is required to provide user ID"]
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required:[true, "it is required to provide product ID"]
    },   
},{
    timestamps:true
})

// we want only user to add only one review for each product
//so we are saying creating a unique index combining the product and user so that there are no ducplicates added
reviewSchema.index({product:1, user: 1}, {unique:true})

module.exports = mongoose.model("Review", reviewSchema)