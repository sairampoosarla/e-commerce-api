const createProduct = async (req, res) => {
    res.send("Product has been created")
}

const getAllProducts = async (req, res) => {
    res.send("These are all the Products")
}

const getSingleProduct = async (req, res) => {
    res.send("This is a single Product")
}

const updateProduct = async (req, res) => {
    res.send("Product has been updated")
}

const deleteProduct = async (req, res) => {
    res.send("Product has been deleted")
}

const uploadImage = async (req, res) => {
    res.send("Image has been uploaded")
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}