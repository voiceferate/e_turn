const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('regions', regionSchema)