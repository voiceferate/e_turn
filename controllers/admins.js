const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const roleChecker = require('../utils/roleChecker')




module.exports.getAll = async function(req, res) {
  roleChecker.checkRole(req, res)

  try {
    const Users = await User
      .find({})
    res.status(200).json(Users)
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.getById = async function(req, res) {
  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    await User.findByIdAndRemove({_id: req.params.id})
    res.status(200).json({
      message: 'Адміністратор видалений.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.update = async function(req, res) {
  const updated = {
    status: req.body.status
  }

  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}