const router = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

if("test" === process.env.NODE_ENV) {
  router.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
}



module.exports = router