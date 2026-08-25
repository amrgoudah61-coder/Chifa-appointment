const express = require('express')
const router = express.Router()
const{ getAllusers, getSingleUser, updateAnUser, deleteAnUser } = require('../controllers/userController')
const {verifyTokenAndAdmin,verifyTokenAndAutharization}=require('../middlewares/verifyToken')
// user can only update and delete , admin can do anything
router.route('/').get(verifyTokenAndAdmin,getAllusers)
router.route('/:id').get(verifyTokenAndAdmin ,getSingleUser).put(verifyTokenAndAutharization, updateAnUser).delete(verifyTokenAndAutharization, deleteAnUser)

module.exports = router