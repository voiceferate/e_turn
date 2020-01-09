const Holiday = require('../models/Holiday')
const errorHandler = require('../utils/errorHandler')
const roleChecker = require('../utils/roleChecker')


module.exports.getAll = async function(req, res) {
  try {
    const holidays = await Holiday.find({})
    res.status(200).json(holidays)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    const holiday = await Holiday.findById({
      _id: req.params.id,
    })
    res.status(200).json(holiday)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    const holiday = await new Holiday({
      holiday: req.body.holiday,
      holiday_name: req.body.holiday_name,
    }).save()
    res.status(201).json(holiday)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    await Holiday.findByIdAndRemove({_id: req.params.id})
    res.status(200).json({
      message: 'Вихідний успішно видалений.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    
    const position = await Holiday.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}
