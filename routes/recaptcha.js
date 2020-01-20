const express = require('express')
const controller = require('../controllers/recaptcha')

const router = express.Router()

router.post('/check', controller.check)

module.exports = router