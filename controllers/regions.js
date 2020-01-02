const Region = require('../models/Region')
const errorHandler = require('../utils/errorHandler')
const roleChecker = require('../utils/roleChecker')




module.exports.getAll = async function(req, res) {
  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    const regions = await Region
      .find({})
      .sort({ name: 1 })
    res.status(200).json(regions)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    const region = await Region.findById(req.params.id)
    res.status(200).json(region)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    await Region.findByIdAndRemove({_id: req.params.id})
    res.status(200).json({
      message: 'Область видалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {

  const region = new Region({
    name: req.body.name,
    active: req.body.active,
  })

  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    await region.save()
    res.status(201).json(region)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name,
    active: req.body.active
  }

  try {
    // перевірка права доступу
    roleChecker.checkRole(req, res)

    const region = await Region.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(region)
  } catch (e) {
    errorHandler(res, e)
  }
}