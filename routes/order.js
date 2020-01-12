const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:vprId', controller.getAllByVprId)
router.get('/vpr-free-date/:id', controller.getBusyDaysByVprId)
router.post('/vpr/time', controller.getBusyPeriodsByVprId)

router.post('/', passport.authenticate('jwt', {session: false}), controller.create)


module.exports = router