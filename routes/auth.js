const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

// localhost:5000/api/auth/login
router.post('/login', controller.validate('login'), controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.validate('createUser'),  controller.register)


module.exports = router