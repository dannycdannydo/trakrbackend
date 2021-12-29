const express = require('express')
const bodyParser = require('body-parser')
// const expressWinston = require('express-winston')
const router = require('./routes/createRouter.js')()
var chargebee = require('chargebee');

module.exports = () => express()
// .use(expressWinston.logger({
//     winstonInstance: logger,
//     msg: '{{res.statusCode}} {{req.method}} {{req.url}} {{res.responseTime}}ms',
//     meta: false,
// }))
.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  })
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json())
.use((req, res, next) => {
    req.base = `${req.protocol}://${req.get('host')}`
    return next()
})
.use(express.static('./public'))
.use('/api', router)
.use((error, req, res, next) => {
    // logger.error(error, error)
    res.status(error.status || 500).json({ error })
})

chargebee.configure({site : "trakr", 
  api_key : "live_KE0M4xJUjjqSvzacd3SsSuzj1VYSIZPAf"});

