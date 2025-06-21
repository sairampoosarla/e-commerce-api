const Product = require("../models/Product")
const {StatusCodes} = require('http-status-codes')
const {NotFoundError} = require('../errors/index')
const cloudinary = require('cloudinary').v2



const createProduct = async (req, res) => {
    //console.log(req.body)
    //console.log(req.user)
    req.body.user = req.user.id


    const product = await Product.create({...req.body})
    res.status(StatusCodes.OK).json({product:product})
    //res.send("These are all the Products")
}


const getAllProducts = async (req, res) => {

    const products = await Product.find({},'name')
    res.status(StatusCodes.OK).json({products:products})
}

const getSingleProduct = async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id,'name')
    if(!product){
        throw new NotFoundError("product is not found")
    }

    res.status(StatusCodes.OK).json({product})
    //res.send("This is a single Product")
}

const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id:req.params.id}, req.body,{new:true,runValidators:true})

    if(!product){
        throw new NotFoundError('product is not found')
    }
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    //console.log(req.params)

    const product = await Product.findOne({_id:req.parms.id})

    if(!product){
        throw new NotFoundError("product is not found")
    }

    await product.remove()
    res.status(StatusCodes.OK).json({msg:"Product has been removed"})



    //alternative way to delete the product
    //const itemsDeleted = await Product.findOneAndDelete({_id:req.params.id})
    r//es.status(StatusCodes.OK).json({deletedItem:itemsDeleted})
}

const uploadImage = async (req, res) => {
    console.log(req.files.image)
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
            use_filename: true,
            folder:'file-upload',
        })
    console.log("after uploading the file")
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
    //res.send("Image has been uploaded")
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}