const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/single/:id', controller.getById)
router.post('/client', controller.validate('getByClientCode'),  controller.getByClientCode)

router.get('/:vprId', controller.getAllByVprId)
router.get('/vpr-free-date/:id', controller.getBusyDaysByVprId)
router.post('/vpr/time', controller.validate('getBusyPeriodsByVprId'), controller.getBusyPeriodsByVprId)

router.post('/', controller.validate('create'), controller.create)


module.exports = router