const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
  try {
    const orders = await Order
      .find({})
      .sort({date: 1})

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getAllByVprId = async function(req, res) {
  try {
    const orders = await Order
      .find({vpr: req.params.vprId})
      .sort({date: 1})

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {

    const candidateOrder = await Order.find({vpr: req.body.vpr, date: req.body.date, time_period_number: req.body.time_period_number})
    console.log(candidateOrder)
    if (candidateOrder.length) {
      res.status(500).json({
        message: 'Даний період зайнятий'
      })
    } else {
      const order = await new Order({
        region: req.body.region,
        vpr: req.body.vpr,
        date: req.body.date,
        customer_id_code: req.body.customer_id_code,
        time_period_number: req.body.time_period_number,
      }).save()
  
      res.status(201).json(order)
    }
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getBusyDaysByVprId = async function(req, res) {
  try {
    const dates = await Order
      .find({vpr: req.params.id})
      .sort({date: -1})

    let freeDatesObj = {}
    dates.forEach( (el, index, array) => {
      

      if (freeDatesObj[el._doc.date]) {
        freeDatesObj[el._doc.date] = freeDatesObj[el._doc.date] + 1

      } else {
        freeDatesObj[el._doc.date] = 1
      }
    })

    for (let el in freeDatesObj) {
      console.log(freeDatesObj[el])
      if (freeDatesObj[el] >= 4) {
        freeDatesObj[el] = 'busy'
      }
    }

    console.log(freeDatesObj)

    res.status(200).json(freeDatesObj)


  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getBusyPeriodsByVprId = async function(req, res) {
  try {
    
    const periods = await Order
      .find({
        vpr: req.body.vpr,
        date: req.body.date
      })

      res.status(200).json(periods)


  } catch (e) {
    errorHandler(res, e)
  }
}