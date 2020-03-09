const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const moment = require('moment')
const { check, validationResult } = require('express-validator')


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

module.exports.getById = async function(req, res) {
  try {
    const order = await Order
      .findById({_id: req.params.id})
    res.status(200).json(order)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getByClientCode = async function(req, res) {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  try {
    const order = await Order
      .find({customer_id_code: req.body.customer_id_code})
    res.status(200).json(order)

  } catch (e) {
    errorHandler(res, e)
  }
}

//service fetch()
module.exports.getAllByVprId = async function(req, res) {
  try {
    let start = moment()
    let end = moment().add(31, 'days')

    const orders = await Order
      .find({
        vpr: req.params.vprId,
        "date": {"$gte": start, "$lt": end}
      })
      .sort({date: 1})

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {


  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

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
        customer_name: req.body.name,
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

  let start = moment()
  let end = moment().add(31, 'days')

  try {
    const dates = await Order
      .find({
        vpr: req.params.id,
        "date": {"$gte": start, "$lt": end}
      })
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


  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

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

exports.validate = (method) => {
  switch (method) {
    case 'getByClientCode': {
     return [ 
      check('customer_id_code')
        .exists() 
        .isNumeric()
        .withMessage('Поле повинно складатися тільки з цифр')
       ]   
    }
    case 'getBusyPeriodsByVprId': {
      return [ 
       check('vpr')
         .exists()  
         .isMongoId()
         .withMessage('Не вірний формат VPR'),
       check('date')
         .exists() 
         .custom(val => {   
            const date = moment(val).isValid()
            if (date) return true
            return false
          })
         .withMessage('Невірний формат дати')
        ]   
     }
     case 'create': {
      return [ 
      check('region')
        .exists()  
        .isMongoId()
        .withMessage('Не вірний формат region'),
      check('vpr')
        .exists()  
        .isMongoId()
        .withMessage('Не вірний формат vpr'),
      check('date')
        .exists() 
        .custom(val => {   
          const date = moment(val).isValid()
          if (date) return true
          return false
        })
        .withMessage('Невірний формат дати'),
      // тут якась магія, я хз чого валідація паде
        // check('customer_name')
      //   .exists() 
      //   .withMessage('Невірний формат customer_name'),
      check('customer_id_code')
        .exists() 
        .isNumeric()
        .withMessage('Поле повинно складатися тільки з цифр'),
      check('time_period_number')
        .exists() 
        .isNumeric()
        .withMessage('Невірний формат period')
      ]   
     }
  }
}
