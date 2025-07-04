## Hosted Project

[E-Commerce API Render URL](https://node-course-e-commerce.onrender.com/)

- npm install && npm run

#### Setup Basic Express Server

- [x] import express and assign to variable
- [x] setup start port variable (5000) and start function

#### Connect To DB

- [x] get connection string
- [x] setup .env with MONGO_URL variable and assign the value
- [x] import 'dotenv' and setup package
- [x] import connect() and invoke in the starter
- [x] restart the server
- [x] mongoose V6 info

#### Basic Routes and Middleware

- [x] setup / GET Route
- [x] setup express.json() middleware
- [x] setup 404 and errorHandler middleware
- [x] import 'exress-async-errors' package

#### 404 vs ErrorHandler Middleware

#### Morgan Pacakge

- [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model

- [x] create models folder and User.js file
- [x] create schema with name,email, password (all type:String)
- [x] export mongoose model

#### Validator Package

- [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure

- [x] create controllers folder
- [x] add authController file
- [x] export (register,login,logout) functions
- [x] res.send('some string value')
- [x] create routes folder
- [x] setup authRoutes file
- [x] import all controllers
- [x] setup three routes
- [x] post('/register') post('/login') get('/logout')
- [x] import authRoutes as authRouter in the app.js
- [x] setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller

- [x] create user
- [x] send response with entire user (only while testing)
- [x] check if email already in use (schema and controller)
- [x] ignore 'role'
- [] alternative 'admin' setup

#### Handle Password

- [x] UserSchema.pre('save') - hook
- [x] this points to User
- [x] bcrypt.genSalt - number of rounds
- [x]bcrypt.hash

#### JWT

- [x] require 'jsonwebtoken' package
- [x] create jwt - jwt.sign(payload,secret,options)
- [x] verify jwt - jwt.verify(token,secret)
- [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [x] restart the server !!!!
- [x] refactor code, create jwt functions in utils
- [x] refactor cookie code
- [x] setup func attachCookiesToResponse
- [x] accept payload(res, tokenUser)
- [x] create token, setup cookie
- [x] optionally send back the response

#### Login Route

- [x] check if email and password exist, if one missing return 400
- [x] find user, if no user return 401
- [x] check password, if does not match return 401
- [x] if everything is correct, attach cookie
  and send back the same response as in register

#### Logout Route

- [x] set token cookie equal to some string value
- [x] set expires:new Date(Date.now())

#### User Routes Structure

- [x] add userController file
- [x] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [x] res.send('some string value')
- [x] setup userRoutes file
- [x] import all controllers
- [x] setup just one route - router.route('/').get(getAllUsers);
- [x] import userRoutes as userRouter in the app.js
- [x] setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser

- [x] Get all users where role is 'user' and remove password
- [x] Get Single User where id matches id param and remove password
- [x] If no user 404

#### Authenticate User Setup

- [x] add the auth function in authenticate.js file
- [x] using isValid function from jwt in auth function to validate the token

#### Auth User Complete

- [x] add user details from validation in req.user in auth function
- [x] add the auth as middleware in userroutes file as for the required routes

#### Authorize Permissions Setup

- [x] hardcode

#### Authorize Permissions Complete

- [x] introduce params

#### ShowCurrentUser

- [x] get user from req
- [x] send response with user

#### UpdateUserPassword

- [x] almost identical to login user
- [x] add authenticateUser middleware in the route
- [x] check for oldPassword and newPassword in the body
- [x] if one missing 400
- [x] look for user with req.user.userId
- [x] check if oldPassword matches with user.comparePassword
- [x] if no match 401
- [x] if everything good set user.password equal to newPassword
- [x] await user.save()

#### createTokenUser in Utils

- [x] create a file in utils (createTokenUser)
- [x] setup a function that accepts user object and returns userToken object
- [x] export as default
- [x] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

- [x] add authenticateUser middleware in the route
- [x] check for name and email in the body
- [x] if one is missing, send 400 (optional)
- [x] use findOneAndUpdate()
- [x] create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()
- [x] write updateUser function where using the user.save() method
- [x] add the contion is user.pre function to olny has the password where is change in password only

#### Setup and Apply checkPermissions()
- [x] create a new file in utils called checkPermissions
- [x] create a new function in it called as checkPermissions
- [x] function accepts two variables one middleware user variable and user variable retuned by mangose
- [x] in this function check if the user is admin, if yes then return
- [x] in this function check if it is the same user from the middleware variable and mangoose variable, if yes return

#### Product Model

- [x] create Product.js in models folder
- [x] create Schema
- [x] name : {type:String}
- [x] price: {type:Number}
- [x] description: {type:String}
- [x] image: {type:String}
- [x] category: {type:String}
- [x] company: {type:String}
- [x] colors: {type:[]}
- [x] featured: {type:Boolean}
- [x] freeShipping: {type:Boolean}
- [x] inventory:{type:Number}
- [x] averageRating:{type:Number}
- [x] user
- [x] set timestamps
- [x] export Product model

#### Product Structure

- [x] add productController file in controllers
- [x] export (createProduct, getAllProducts,
  getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
- [x] res.send('function name')
- [x] setup productRoutes file in routes
- [x] import all controllers
- [x] only getAllProducts and getSingleProduct accessible to public
- [x] rest only by admin (setup middlewares)
- [x] typical setup
- [x] router.route('/uploadImage').post(uploadImage)
- [x] import productRoutes as productRouter in the app.js
- [x] setup app.use('/api/v1/products', productRouter)

#### Product Routes in Postman
- [x] setup all the product routes in postman

#### Create Product

- [x] create user property on req.body and set it equal to userId (req.user)
- [x] pass req.body into Product.create
- [x] send back the product

#### Remaining Controllers (apart from uploadImage)

- [x] getAllProducts
- [x] getSingleProduct
- [x] updateProduct
- [x] deleteProduct
- [x] typical CRUD, utilize (task or job) project
- [x] remember we check already for role 'admin'

#### Upload Image

- [x] if some question, re-watch 07-file-upload
- [x] images folder with two images

#### Review Model

- [x] create Review.js in models folder
- [x] create Schema
- [x] rating : {type:Number}
- [x] title: {type:String}
- [x] comment: {type:String}
- [x] user
- [x] product
- [x] set timestamps
- [x] export Review model

#### Review Structure

- [x] add reviewController file in controllers
- [x] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
- [x] res.send('function name')
- [x] setup reviewRoutes file in routes
- [x] import all controllers
- [x] only getAllReviews and getSingleReview accessible to public
- [x] rest only to users (setup middleware)
- [x] typical REST setup
- [x] import reviewRoutes as reviewRouter in the app.js
- [x] apply index for user and product so that a unique ID is created and a user can only add one review to a product
- [x] setup app.use('/api/v1/reviews', reviewRouter)

#### Create Review

- [x] check for product in the req.body
- [x] attach user property (set it equal to req.user.userId) on to req.body
- [x] create review
- [x] don't test yet


#### Get All Reviews and Get Single Review

- [x] both public routes, typical setup

#### Delete Review

- [x] get id from req.params
- [x] check if review exists
- [x] if no review, 404
- [x] check permissions (req.user, review.user)
- [x] use await review.remove()
- [x] send back 200

#### Update Review

- [x] get id from req.params
- [x] get {rating, title comment} from req.body
- [x] check if review exists
- [x] if no review, 404
- [x] check permissions
- [x] set review properties equal to rating, title, comment
- [x] use await review.save()
- [x] send back 200

#### Populate
- [x] use the populate method in getallReviews controller and send the information related to product and user back in response

#### Virtuals
- [] 

#### Get Single Product Reviews

#### Remove All Reviews

#### Aggregation Pipeline - Atlas and Code

#### Order Schema

- [] create Order.js in models folder
- [] create Schema
- [] tax : {type:Number}
- [] shippingFee: {type:Number}
- [] subtotal: {type:Number}
- [] total: {type:Number}
- [] orderItems:[]
- [] status:{type:String}
- [] user
- [] clientSecret:{type:String}
- [] paymentId:{type:String}
- [] set timestamps
- [] export Order model

#### Order Structure

- [] add orderController file in controllers
- [] export (getAllOrders, getSingleOrder, getCurrentUserOrders,
  createOrder, updateOrder) functions
- [] res.send('function name')
- [] setup orderRoutes file in routes
- [] import all controllers
- [] authenticate user in all routes
- [] getAllOrders admin only
- [] typical REST setup
- [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
- [] import orderRoutes as orderRouter in the app.js
- [] setup app.use('/api/v1/orders', orderRouter)

#### Order in Postman

#### Create Order

- [] most complex

#### Get All Orders and Get Single Order

- [] getAllOrders - admin only
- [] getSingleOrder - chechPermissions

#### Get Current User Orders

- [] find orders where user is equal to req.user.userId

#### Update Order

- [] get order id
- [] get paymentIntentId (req.body)
- [] get order
- [] if does not exist - 404
- [] check permissions
- [] set paymentIntentId and status as 'paid'
- [] order.save()

#### Create Docs

- [] [Docgen Library] (https://github.com/thedevsaddam/docgen)
- [] Export Postman Collection
- [] docgen build -i fileName.json -o index.html
- [] create index.html in public

#### Security Packages

- [] express-rate-limiter
- [] helmet
- [] xss-clean
- [] express-mongo-sanitize
- [] cors (cookies!!!!)

#### Deploy on Heroku

- [] heroku account and heroku cli
- [] remove/copy from the main repo
- [] add dev command "nodemon app.js"
- [] change start to "node app.js"
- [] setup node version in package.json
- [] "engines": {"node": "14.x"}
- [] Procfile "web: node app.js"
- [] remove existing git repo
- [] rm -rf .git - mac,
- [] git init
- [] git add .
- [] git commit -m "initial commit"
- [] heroku login
- [] heroku create "App Name"
- [] git remote -v
- [] setup env vars in GUI
- [] git push heroku master/main
