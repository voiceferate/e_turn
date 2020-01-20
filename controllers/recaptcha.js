const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')

const Recaptcha = require('recaptcha-v2').Recaptcha;

module.exports.check = async function(req, res) {
    
console.log(req.body)

    const data = {
		remoteip:  req.connection.remoteAddress,
		response:  req.body.resolvedCaptcha,
		secret: keys.recaptchaSecret
    };

    const recaptcha = new Recaptcha(keys.recaptchaPublic, keys.recaptchaSecret, data);

    recaptcha.verify(function(success, error_code) {
        if (success) {
            res.json({message: 'captcha sussess'})
        }
        else {
            res.json({message: 'captcha unsussess'})
        }
    });
}



