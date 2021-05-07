const cors = require("cors")

let whitelist = [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2, process.env.CORS_ORIGIN_LOCAL]

let corsMiddleware = cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: ["Content-Type", "Authorization", "params"],
})

module.exports = corsMiddleware;