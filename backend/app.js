const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const mongoose = require("mongoose")
const middleware = require("./utils/middleware")

mongoose
  .connect(config.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logger.info("connected to mongoDB")
  })
  .catch(err => {
    logger.err(`failed to connect to mongoDB: ${err}`)
  })

const app = express()
app.use(middleware.requestLogger)
app.use(cors())
app.use(express.json())

app.use(middleware.errorHandler)

module.exports = app