const express = require('express')
const passport = require('passport')
const controller = require('../controllers/regions')
const router = express.Router()



router.get('/', controller.getAll)
router.get('/active', controller.getAllActive)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)


module.exports = router