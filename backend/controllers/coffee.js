const Coffee = require("../models/coffee")

const coffeeRouter = require("express").Router()

coffeeRouter.get("/", async (req, res) => {
  const coffees = await Coffee
    .find({})
    .populate("bean")
  res.json(coffees)
})

module.exports = coffeeRouter