const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  region: {
    ref: 'regions',
    type: Schema.Types.ObjectId
  },
  vpr: {
    ref: 'vprs',
    type: Schema.Types.ObjectId
  },
  date: {
    type: Date,
    required: true
  },
  customer_id_code: {
    type: Number,
    required: true
  },
  time_period_number: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('orders', orderSchema)