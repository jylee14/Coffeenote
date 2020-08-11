const Bean = require("../models/bean")
const Coffee = require("../models/coffee")

const coffeeRouter = require("express").Router()

coffeeRouter.get("/", async (req, res) => {
  const coffees = await Coffee
    .find({})
    .populate("bean", {
      origin: 1,
      roastDate: 1
    })
  res.json(coffees)
})

coffeeRouter.post("/", async (req, res) => {
  const body = req.body

  if(!body) {
    return res
      .status(400)
      .send({
        error: "Missing request body"
      })
  }

  const origin = body.origin
  const roastDate = body.roastDate
  const coffeeWeight = Number(body.coffeeWeight)
  const finalWeight = Number(body.finalWeight)
  const brewMethod = body.brewMethod
  const tasteRating = Number(body.tasteRating)

  if(!origin || !roastDate || !coffeeWeight || !finalWeight || !brewMethod || !tasteRating) {
    return res
      .status(400)
      .send({
        error: "Missing required data"
      })
  }

  // check if the bean data exists in the DB already
  let bean = await Bean.findOne({
    origin, 
    roastDate
  })

  if(!bean) {
    const newBeanData = new Bean({ origin, roastDate })
    bean = await newBeanData.save()
  }

  const coffeeData = new Coffee({
    bean: bean._id,
    coffeeWeight,
    finalWeight,
    brewMethod,
    tasteRating
  })

  const savedCoffee = await coffeeData.save()
  res.status(201).json(savedCoffee)
})

module.exports = coffeeRouter