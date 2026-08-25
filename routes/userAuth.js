const express = require('express')
const router = express.Router()
const { registerNewuser,l, loginAnUser }= require('../controllers/userAuthController')

router.route('/register').post(registerNewuser)
router.route('/login').post(loginAnUser)
// router.route('/:id').get().put().delete()
module.exports = router