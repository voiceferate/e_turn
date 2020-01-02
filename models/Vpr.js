const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vprSchema = new Schema({
  region: {
    ref: 'regions',
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  // vacation: {

  // }
  
})

module.exports = mongoose.model('vpr', vprSchema)