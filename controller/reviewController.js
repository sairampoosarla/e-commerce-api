const Review = require("../models/Review")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError} = require("../errors/index")

const createReview = async (req, res) => {
    req.body.user = req.user.id
    //console.log(req.body)

    const review = await Review.create({...req.body})
 7
    res.status(StatusCodes.OK).json({review:review})
}

const getAllReviews = async (req, res) => {
    const review = await Review.find({},'title')
    res.status(StatusCodes.OK).json({review:review})
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