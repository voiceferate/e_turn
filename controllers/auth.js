const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const roleChecker = require('../utils/roleChecker')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
        role: candidate.role
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`,
        role: candidate.role
      })
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Невірний пароль. Спробуйте знову'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Користувача з таким email не знайдено.'
    })
  }
}


module.exports.register = async function(req, res) {
  // email password
  console.log(req.body)
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такий email уже зайняти. Спробуйте інший.'
    })
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}