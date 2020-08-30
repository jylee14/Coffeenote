const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getUserToken = async () => {
  const user = await User.findOne({ username: 'test'})

  const userToken = {
    id: user._id,
    username: user.username
  }

  return jwt.sign(userToken, process.env.SECRET_KEY)
}

module.exports = { getUserToken }