const Bean = require("../models/bean")
const beanRouter = require("express").Router()

beanRouter.get("/", async (req, res) => {
  const beans = await Bean.find({})
  res.json(beans)
})

const formatDateString = str => {
  if(str.length < 8) { // expect query to be in yyyymmdd format
    return null
  }
  const year = str.substring(0, 4)
  const month = str.substring(4, 6)
  const day = str.substring(6)

  return `${year}-${month}-${day}`
}

beanRouter.get("/:specific", async (req, res) => {
  const query = req.params.specific
  // is the requested detail roast date or origin?
  if (Number(query)) { 
    const roastDate = formatDateString(query)
    const beansRoastedOn = await Bean.find({ roastDate })

    res.json(beansRoastedOn)
  } else {
    const beansWithOrigin = await Bean.find({ 
      "origin": {
        $regex: new RegExp(query, "i")
      }
    })
    res.json(beansWithOrigin)
  }
})

beanRouter.get("/:origin/:date", async (req, res) => {
  const origin = req.params.origin
  const roastDate = formatDateString(req.params.date)

  if(!roastDate) {
    return res
      .status(400)
      .send({
        error: "invalid date string"
      })
  }
  const matchingBeans = await Bean.find({
    origin: { $regex: new RegExp(origin, "i") },
    roastDate
  })

  res.json(matchingBeans)
})



module.exports = beanRouter