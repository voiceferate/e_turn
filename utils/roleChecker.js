const keys = require('../config/keys')
const jwt = require('jws')


module.exports.checkRole = function(req, res) {

    const token = jwt.verify(req.headers.authorization.slice(7), keys.jwt)
    console.log(token.role)

    if (token.role === 'su_admin') {
      return true
    } else {
      res.status(409).json('acces_restricted')
    }

}
