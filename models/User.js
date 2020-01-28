const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'ra_admin'
  },
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('users', userSchema)