const logger = require("./logger")

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method}`)
  logger.info(`Path: ${req.path}`)
  logger.info(`Body: ${req.body}`)
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.err(err.message)

  if("CastError" === err.name && "ObjectId" === err.kind) {
    return res.status(400).send({
      error: "Invalid ID"
    })
  }
  next()
}

module.exports = {
  requestLogger,
  errorHandler
}