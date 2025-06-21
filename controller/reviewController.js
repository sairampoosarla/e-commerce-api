const Review = require("../models/Review")
const {StatusCodes} = require('http-status-codes')

const createReview = async (req, res) => {
    req.body.user = req.user.id
    //console.log(req.body)

    const review = await Review.create({...req.body})

    res.status(StatusCodes.OK).json({review:review})
}

const getAllReviews = async (req, res) => {
    res.send("These are all the reviews")
}

const getSingleReview = async (req, res) => {
    console.log(req.params)
    res.send("Single Review")
}

const updateReview = async (req, res) => {
    console.log(req.params)
    res.send("Review has been updated")
}

const deleteReview = async (req, res) => {
    console.log(req.params)
    res.send("Review has been deleted")
}

module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
}