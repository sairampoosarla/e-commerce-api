const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, "price of Product is manidatory"],
        maxlength: [100, 'name can not be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, "price of Product is manidatory"],
        default: 0
    },
    description:{
        type: String,
        required: [true, "Please provide Product description"],
        maxlength: [1000, 'description can not be more than 100 characters']
    },
    image:{
        type: String,
        default:'/uploads/example.jpeg'
    },
    category:{
        type: String,
        enum:['office','kitchen'],
        required: [true, "Please provide Product category"],
    },
    company:{
        type: String,
        required: [true, "Please provide company of the Product"],
        enum:{
            values: ['ikea','liddy','marcos'],
            message: '{VALUE} is not supported'
        }
    },
    colors:{
        type: [String],
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    },
    freeShipping:{
        type: Boolean,
        default: false
    },
    inventory:{
        type: Number,
        required: true,
        default: 0
    },
    averageRating:{
        type: Number,
        default:0
        //required: [true, "price of Product is manidatory"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    }
},
{
    timestamps:true,
    //here we are setting up the parameters for virtuals
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

//here we are setting up the virtual connection
productSchema.virtual('reviews',{
    ref:'Review',
    //this is feild that we are using from the product model
    localField:'_id',
    //this is the feild that is linked in the review model 
    foreignField:'product',
    justOne:false
})

//this is a prefunction which is triggered before delete function is run
//here we are first deleting all the reviews that are related to the prduct before deleting the product itself
productSchema.pre('remove', async function (next){
    await this.model('Review').deleteMany({product:this._id})
})

module.exports = mongoose.model("Product", productSchema)