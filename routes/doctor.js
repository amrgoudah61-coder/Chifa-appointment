const express = require('express')
const router = express.Router()
const { getSingleDoctor, updateAnDoctor, deleteAnDoctor, getDoctors, getAlldoctors } = require('../controllers/doctorController')
const { verifyTokenAndAdmin, verifyTokenAndAutharization }= require('../middlewares/verifyToken')

// routes
router.route('/').get(verifyTokenAndAdmin, getAlldoctors)
router.route('/:id').get(verifyTokenAndAdmin ,getSingleDoctor).put(verifyTokenAndAdmin, updateAnDoctor).delete(verifyTokenAndAdmin, deleteAnDoctor)

module.exports = router