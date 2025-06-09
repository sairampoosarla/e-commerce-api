const express = require('express')

const {auth, authorize} = require('../middleware/authentication')

const router = express.Router()


const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controller/userController')

router.route('/').get(auth, authorize('admin'), getAllUsers)
router.route('/showMe').get(auth, showCurrentUser)
router.route('/updatePassword').post(auth, updateUserPassword)
router.route('/updateUser').post(auth, updateUser)

router.route('/:id').get(auth, getSingleUser)


module.exports = router