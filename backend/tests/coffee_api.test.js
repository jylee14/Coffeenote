const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Coffee = require("../models/coffee")
const testHelper = require("./coffeeTestHelper")

const api = supertest(app)

beforeEach(async () => {
  await Coffee.deleteMany({})

  const beans = await api.get("/api/bean")
  const beansId = beans.body.map(bean => bean.id)

  const initialCofeeNotes = testHelper.initialCoffeeNotes
  const coffeeDocuments = initialCofeeNotes.map((coffee, i) => {
    const bean = beansId[i]
    return new Coffee({
      bean: mongoose.Types.ObjectId(bean),
      ...coffee
    })
  })

  const coffeePromises = coffeeDocuments.map(coffee => coffee.save())

  await Promise.all(coffeePromises)
})

describe("GET", () => {
  test("all coffee notes in DB", async () => {
    const results = await api
      .get("/api/coffee")
      .expect(200)
      .expect("Content-Type", /application\/json/)
    
    const brewMethods = results.body.map(coffee => coffee)
    expect(brewMethods).toHaveLength(testHelper.initialCoffeeNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})