const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controller/productController')

const {auth, authorize} = require('../middleware/authentication')

const express = require('express')
const router = express.Router()

router.route("/").get(auth, getAllProducts)
router.route("/uploadImage").post(auth, authorize('admin'), uploadImage)
router.route("/").post(auth, authorize('admin'), createProduct)

//router.route("/deleteProduct").post(auth, authorize('admin'), deleteProduct)

router.route("/:id").get(auth, getSingleProduct)
router.route("/:id").post(auth, authorize('admin'), updateProduct)
router.route("/:id").delete(auth, authorize('admin'), deleteProduct)


module.exports = router