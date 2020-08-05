const cors = require("cors")
const config = require("./utils/config")
const express = require("express")
const mongoose = require("mongoose")

mongoose
  .connect(config.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoDB")
  })
  .catch(err => {
    console.err(err)
  })

const app = express()
app.use(cors())
app.use(express.json())

module.exports = app