const express = require('express')
const { body, query } = require('express-validator')
const { createRide, getFare } = require('../controllers/ride.controller')
const { authUser } = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/create',
    authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    createRide
)

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    getFare
)

module.exports = router