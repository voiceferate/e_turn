const mongoose = require('mongoose')
const Schema = mongoose.Schema

const holidaySchema = new Schema({
  holiday: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('holiday', holidaySchema)