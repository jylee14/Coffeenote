const User = require('../models/user')
const Bean = require('../models/bean')
const beanRouter = require('express').Router()

const jwt = require('jsonwebtoken')

const formatDateString = str => {
  if (str.length < 8) { // expect query to be in yyyymmdd format
    return null
  }
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6)

  return `${year}-${month}-${day}`
}

// GET STARTS HERE
beanRouter.get('/', async (req, res) => {
  if (!req.token) { return res.status(401).end() }

  const user = jwt.verify(req.token, process.env.SECRET_KEY)
  const userData = await User
    .findById(user.id)
    .populate('beans')
    .populate('coffeeNotes', {
      bean: 1,
      brewMethod: 1,
      tasteRating: 1
    })

  res.json(userData)
})

beanRouter.get('/:specific', async (req, res) => {
  const query = req.params.specific
  // is the requested detail roast date or origin?
  if (Number(query)) {
    const roastDate = formatDateString(query)
    const beansRoastedOn = await Bean.find({ roastDate })

    res.json(beansRoastedOn)
  } else {
    const beansWithOrigin = await Bean.find({
      'origin': {
        $regex: new RegExp(query, 'i')
      }
    })
    res.json(beansWithOrigin)
  }
})

beanRouter.get('/:origin/:date', async (req, res) => {
  const origin = req.params.origin
  const roastDate = formatDateString(req.params.date)

  if (!roastDate) {
    return res
      .status(400)
      .send({
        error: 'invalid date string'
      })
  }
  const matchingBeans = await Bean.find({
    origin: { $regex: new RegExp(origin, 'i') },
    roastDate
  })

  res.json(matchingBeans)
})

// POST STARTS HERE 
beanRouter.post('/', async (req, res) => {
  const beanObj = req.body

  if (!beanObj || !beanObj.origin || !beanObj.roastDate) {
    return res
      .status(400)
      .send({
        error: 'Incomplete form'
      })
  }

  const beanDocument = new Bean(beanObj)
  const savedBean = await beanDocument.save()
  res.status(201).json(savedBean)
})

// DELETE 
beanRouter.delete('/:id', async (req, res) => {
  if(!req.token){ return res.status(401).end() }

  const id = req.params.id
  if(!id){
    return res.status(400).end()
  }
  
  const deleteCandidate = await Bean.findByIdAndRemove(id)
  if(!deleteCandidate) {
    return res.status(404).end()
  }
  res.status(204).json(deleteCandidate)
})

module.exports = beanRouter