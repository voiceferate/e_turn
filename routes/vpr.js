const express = require('express')
const passport = require('passport')
const controller = require('../controllers/vprs')
const router = express.Router()

router.get('/region/:regionId', controller.getByRegionId)
router.get('/:id', controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)


module.exports = router