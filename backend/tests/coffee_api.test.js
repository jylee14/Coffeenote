const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Coffee = require("../models/coffee")
const testHelper = require("./coffeeTestHelper")

const api = supertest(app)

beforeEach(async () => {
  await Coffee.deleteMany({})

  const initialCofeeNotes = testHelper.initialCoffeeNotes
  const coffeeDocuments = initialCofeeNotes.map(coffee => new Coffee(coffee))
  const coffeePromises = coffeeDocuments.map(coffee => coffee.save())

  await Promise.all(coffeePromises)
})

describe("GET", () => {
  test("all notes in DB", async () => {
  })


})

afterAll(() => {
  mongoose.connection.close()
})