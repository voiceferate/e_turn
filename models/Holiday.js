const mongoose = require('mongoose')
const Schema = mongoose.Schema

const holidaySchema = new Schema({
  holiday: {
    type: Date,
    required: true
  },
  holiday_name: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('holiday', holidaySchema)