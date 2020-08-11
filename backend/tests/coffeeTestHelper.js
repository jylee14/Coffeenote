const Coffee = require("../models/coffee")

const initialCoffeeNotes = [
  {
    coffeeWeight: 30,
    finalWeight: 500,
    brewMethod: "Pour Over",
    tasteRating: 5,
    brewNotes: "Bloom weight: 60 grams, 300g at 1:15, 500g at 1:45, drawdown took 3:30 "
  }, 
  {
    coffeeWeight: 30,
    finalWeight: 500,
    brewMethod: "French Press",
    tasteRating: 2
  }, 
  {
    coffeeWeight: 17,
    finalWeight: 75,
    brewMethod: "Espresso",
    tasteRating: 5
  }, 
  {
    coffeeWeight: 20,
    finalWeight: 350,
    brewMethod: "Moka Pot",
    tasteRating: 4,
  }, 
  {
    coffeeWeight: 15,
    finalWeight: 250,
    brewMethod: "Drip machine",
    tasteRating: 2
  }
]

const getCoffeeInDb = async () => {
  const coffee = await Coffee.find({})
  return coffee.map(c => c.toJSON())
}

const invalidCoffeeId = async () => {
  const phantomCoffee = new Coffee({
    coffeeWeight: 1,
    finalWeight: 20,
    brewMethod: "",
    tasteRating: 1    
  })

  await phantomCoffee.save()
  await phantomCoffee.remove()

  return phantomCoffee._id.toString()
}

module.exports = {
  initialCoffeeNotes,
  getCoffeeInDb,
  invalidCoffeeId
}