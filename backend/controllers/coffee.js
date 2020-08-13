const User = require("../models/user")
const Bean = require("../models/bean")
const Coffee = require("../models/coffee")

const jwt = require("jsonwebtoken")
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
  const token = req.token
  if(!token) {
    return res
      .status(401)
      .send({
        error: "Missing request token"
      })
  }
  
  const body = req.body
  if (!body) {
    return res
      .status(400)
      .send({
        error: "Missing request body"
      })
  }

  const userToken = jwt.verify(token, process.env.SECRET_KEY)
  if(!userToken.id) {
    return res
      .status(401)
      .send({
        error: "Missing request token"
      })
  }

  const user = await User.findById(userToken.id)

  const origin = body.origin
  const roastDate = body.roastDate
  const coffeeWeight = Number(body.coffeeWeight)
  const finalWeight = Number(body.finalWeight)
  const brewMethod = body.brewMethod
  const tasteRating = Number(body.tasteRating)

  if (!origin || !roastDate || !coffeeWeight || !finalWeight || !brewMethod || !tasteRating) {
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

  if (!bean) {
    const newBeanData = new Bean({ origin, roastDate })
    bean = await newBeanData.save()
    user.beans = user.beans.concat(bean._id) // only concat if new bean is created
  }

  const coffeeData = new Coffee({
    bean: bean._id,
    coffeeWeight,
    finalWeight,
    brewMethod,
    tasteRating
  })

  user.coffeeNotes = user.coffeeNotes.concat(coffeeData._id)
  await user.save()

  const savedCoffee = await coffeeData.save()
  res.status(201).json(savedCoffee)
})

coffeeRouter.delete("/:id", async (req, res) => {
  const token = req.token 
  if(!token) {
    return res
      .status(401)
      .send({
        error: "Missing request token"
      })
  }

  const id = req.params.id

  if (!id) {
    res.status(400).send({
      error: "invalid ID"
    })
  }

  const deleteCandidate = await Coffee.findByIdAndRemove(id)
  if (!deleteCandidate) {
    return res.status(404).end()
  }

  res.status(204).json(deleteCandidate)
})

module.exports = coffeeRouter