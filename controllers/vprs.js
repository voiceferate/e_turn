const Vpr = require('../models/Vpr')
const Region = require('../models/Region')
const errorHandler = require('../utils/errorHandler')
const roleChecker = require('../utils/roleChecker')


module.exports.getByRegionId = async function(req, res) {
  try {
    const vprs = await Vpr.find({
      region: req.params.regionId,
    })
    res.status(200).json(vprs)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const vpr = await Vpr.findById({
      _id: req.params.id,
    })
    res.status(200).json(vpr)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    const vpr = await new Vpr({
      region: req.body.region,
      name: req.body.name,
      address: req.body.address,
      vacation: req.body.vacation
    }).save()
    res.status(201).json(vpr)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    await Vpr.findByIdAndRemove({_id: req.params.id})
    res.status(200).json({
      message: 'Пункт успішно видалений.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  try {
    roleChecker.checkRole(req, res)
    const vpr = await Vpr.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(vpr)
  } catch (e) {
    errorHandler(res, e)
  }
}
