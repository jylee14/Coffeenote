const Bean = require("../models/bean")
const beanRouter = require("express").Router()

beanRouter.get("/", async (req, res) => {
  const beans = await Bean.find({})
  res.json(beans)
})

module.exports = beanRouter