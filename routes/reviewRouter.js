const {auth, authorize} = require('../middleware/authentication')
const express = require('express')
const router = express.Router()

const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require('../controller/reviewController')

router.route("/").get(auth,getAllReviews)
router.route("/").post(auth,createReview)


router.route("/:id").get(auth,getSingleReview)
router.route("/:id").post(auth,updateReview)
router.route("/:id").delete(auth,deleteReview)

module.exports = router