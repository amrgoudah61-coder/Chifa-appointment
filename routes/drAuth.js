const express = require('express')
const router = express.Router()
const {registerNewDoctor,loginAnDr}= require('../controllers/drAuthController')
const { verifyTokenAndAdmin }= require('../middlewares/verifyToken')

router.route('/register').post(verifyTokenAndAdmin, registerNewDoctor)
router.route('/login').post(loginAnDr)

module.exports =router