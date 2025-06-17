const createReview = async (req, res) => {
    res.send("Review has been created")
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