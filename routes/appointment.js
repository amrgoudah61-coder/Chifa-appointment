const express = require('express')
const router = express.Router()
const { getAllAppointments, createAnAppointments, updateAppointmentStatus, cancelAnAppointment, getSingleAppointment }= require('../controllers/appointmentController')
const {verifyToken,verifyTokenAndAutharization,verifyTokenAndAdmin}= require('../middlewares/verifyToken')

router.route('/').get(getAllAppointments).post(createAnAppointments)
router.route('/:id').delete(verifyTokenAndAdmin,cancelAnAppointment)
router.route('/me').get(verifyToken,getSingleAppointment)
router.route('/:id/status').patch(verifyTokenAndAutharization,updateAppointmentStatus) // update appointments by doctor


// we do verifyTken and autharization  to make sure admin token is used for 

module.exports = router



