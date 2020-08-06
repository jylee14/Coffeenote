const Bean = require("../models/bean")
const beanRouter = require("express").Router()

beanRouter.get("/", async (req, res) => {
  const beans = await Bean.find({})
  res.json(beans)
})

beanRouter.get("/:specific", async (req, res) => {
  const query = req.params.specific
  // is the requested detail roast date or origin?
  if (Number(query)) { 
    if(query.length < 8) { // expect query to be in yyyymmdd format
      return res.status(404).send()
    }
    const year = query.substring(0, 4)
    const month = query.substring(4, 6)
    const day = query.substring(6)

    const beansRoastedOn = await Bean.find({
      "roastDate": `${year}-${month}-${day}`
    })

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

module.exports = beanRouter