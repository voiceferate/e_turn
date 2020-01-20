module.exports = {
  mongoURI: process.env.MONGO_URI,
  // mongoURI: 'mongodb+srv://voiceferate:vxTRV5u6vGVSCckT@fullstack-ygdhd.mongodb.net/test?retryWrites=true&w=majority',
  jwt: process.env.JWT,
  // jwt: 'dev-jwt',
  recaptchaSecret: process.env.RECAPTCHA_SECRET,
  // recaptchaSecret: '6LePG9EUAAAAAHNaF29xXWoIiVUacN34RRNvVZgn',
  recaptchaPublic: process.env.RECAPTCHA_PUBLIC
  // recaptchaPublic: '6LePG9EUAAAAAI1etO6bfExjQdPcORcRiX98x0At'
}