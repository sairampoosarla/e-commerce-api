const Review = require("../models/Review")
const Product = require("../models/Product")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require("../errors/index")

const createReview = async (req, res) => {
    req.body.user = req.user.id
    //console.log(req.body)

    const productID = req.body.product
    //checking if there is a product with the requested ID
    const isValidProduct = await Product.findOne({_id: productID})

    if (!isValidProduct){
        throw new NotFoundError(`There is not product with requested id:${productID}`)
    }

    //checking if there is a review already submitted by the user for the product
    const alreadySubmitted = await Review.findOne({
        user:req.user.id,
        product:productID
    })

    if(alreadySubmitted){
        throw new BadRequestError("There is a review already submitted by the user")
    }

    const review = await Review.create({...req.body})
 
    res.status(StatusCodes.OK).json({review:review})
}

const getAllReviews = async (req, res) => {
    // here the populate method will help in getting the information from the records from related tables 
    const reviews = await Review.find({}).populate({
        path:'product',
        select:'name company price'
    }).populate({
        path:'user',
        select:'name'
    })
    res.status(StatusCodes.OK).json({review:reviews})
    //res.send("These are all the reviews")
}

const getSingleReview = async (req, res) => {
    console.log(req.params)
    
    const review = await Review.findById(req.params.id)

    if(!review){
        throw new NotFoundError("review is not found")
    }

    res.status(StatusCodes.OK).json({review})
    //res.send("Single Review")
}

const updateReview = async (req, res) => {
    const review = await Review.findById(req.params.id)

    if (!review){
        throw new NotFoundError("review is not found")
    }
    if(req.user.id!=review.user.toString()) {
        throw new BadRequestError("You don't have sufficent permissions to make this request");
    }
    review.rating = req.body.rating
    review.title = req.body.title
    review.comment = req.body.comment
    review.save()
    

    res.status(StatusCodes.OK).json({msg:"Review has been updated"})
}

const deleteReview = async (req, res) => {
    //console.log(req.params)
    //console.log(req.user)
    //console.log(req.parms.id)
    ////console.log(req.user.id)
    const review = await Review.findOne({_id:req.params.id})
    //console.log(review)
    if(!review){
        throw new NotFoundError("review is not found")
    }

    //console.log(typeof(req.user.id))
    //console.log(typeof(review.user.toString))

    //console.log(req.user.id)
    //console.log(review.user.toString())
    if(req.user.id!=review.user.toString()) {
        throw new BadRequestError("You don't have sufficent permissions to make this request");
    }
    await review.remove()
    res.status(StatusCodes.OK).json({msg:"Review has been removed"})    
    
    //res.send("Review has been deleted")
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}