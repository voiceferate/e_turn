const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/vpr/date/:id', controller.getBusyDaysByVprId)
router.get('/vpr/time', controller.getBusyPeriodsByVprId)

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)


module.exports = router