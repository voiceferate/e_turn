const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const regionRoutes = require('./routes/region')
const vprRoutes = require('./routes/vpr')
const holidayRoutes = require('./routes/holiday')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, { 
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

mongoose.set('useCreateIndex', true);


app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
// app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/region', regionRoutes)
app.use('/api/vpr', vprRoutes)
app.use('/api/holiday', holidayRoutes)



module.exports = app