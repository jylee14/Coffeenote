const router = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

if("test" === process.env.NODE_ENV) {
  router.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
}

router.post("/", async (req, res) => {
  const body = req.body
  if(!body) {
    return res.status(400)
      .send({
        error: "missing body in request"
      })
  }

  const username = body.username
  const password = body.password
  if(!username || !password) { 
    return res.status(400)
      .send({
        error: "missing username or password"
      })
  }

  const rounds = 10
  const passwordHash = await bcrypt.hash(password, rounds)
  const newUser = new User({ username, passwordHash })
  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

module.exports = router