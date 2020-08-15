const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Bean = require("../models/bean")
const Coffee = require("../models/coffee")
const testHelper = require("./coffeeTestHelper")
const getUserToken = require("./userTestHelper").getUserToken

const api = supertest(app)

beforeEach(async () => {
  await Coffee.deleteMany({})

  const beans = await Bean.find({})
  const beansId = beans.map(bean => bean._id)

  const initialCofeeNotes = testHelper.initialCoffeeNotes
  const coffeeDocuments = initialCofeeNotes.map((coffee, i) => {
    const bean = beansId[i]
    return new Coffee({
      bean,
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

describe("POST", () => {
  test("without valid token will return 401", async () => {
    const coffeeWithExisingBean = {
      roastDate: "2020-07-24",
      origin: "Guatamala",
      coffeeWeight: 15,
      finalWeight: 250,
      brewMethod: "Drip machine",
      tasteRating: 2
    }

    await api
      .post("/api/coffee")
      .send(coffeeWithExisingBean)
      .expect(401)        
  })

  test("with existing bean data use existing bean", async () => {
    const userToken = await getUserToken()
    
    const coffeeWithExisingBean = {
      roastDate: "2020-07-24",
      origin: "Guatamala",
      coffeeWeight: 15,
      finalWeight: 250,
      brewMethod: "Drip machine",
      tasteRating: 2
    }

    const res = await api
      .post("/api/coffee")
      .set("Authorization", `bearer ${userToken}`)
      .send(coffeeWithExisingBean)
      .expect(201)
    
    const dbAfterPost = await testHelper.getCoffeeInDb()
    expect(dbAfterPost).toHaveLength(testHelper.initialCoffeeNotes.length + 1)

    const jsonStrings = dbAfterPost.map(doc => JSON.stringify(doc))
    expect(jsonStrings).toContain(JSON.stringify(res.body))
  })

  test.only("with new beans creates doc in DB", async () => {
    await Bean.deleteMany({})
    const userToken = await getUserToken()
    const coffeeWithNewBean = {
      roastDate: "2020-09-01",
      origin: "Guatamala",
      coffeeWeight: 18,
      finalWeight: 75,
      brewMethod: "Espresso",
      tasteRating: 5      
    }

    const beansBeforeAdd = await Bean.find({})
    const res = await api
      .post("/api/coffee")
      .set("Authorization", `bearer ${userToken}`)
      .send(coffeeWithNewBean)
      .expect(201)    
    const beansAfterAdd = await Bean.find({})

    const dbAfterPost = await testHelper.getCoffeeInDb()
    expect(dbAfterPost).toHaveLength(testHelper.initialCoffeeNotes.length + 1)

    const jsonStrings = dbAfterPost.map(doc => JSON.stringify(doc))
    expect(jsonStrings).toContain(JSON.stringify(res.body))

    expect(beansAfterAdd).toHaveLength(beansBeforeAdd.length + 1)
  })
})


describe("DELETE", () => {
  test("fails without a valid token", async () => {
    const targetCoffee = await Coffee.findOne({})
    const deleteID = targetCoffee._id.toString()

    await api
      .delete(`/api/coffee/${deleteID}`)
      .expect(401)        
  })

  test("existing coffee notes can be deleted using ID", async () => {
    const targetCoffee = await Coffee.findOne({})
    const deleteID = targetCoffee._id.toString()

    const userToken = await getUserToken()
    await api
      .delete(`/api/coffee/${deleteID}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(204)
    
    const afterDelete = await Coffee.find({})
    expect(afterDelete).toHaveLength(testHelper.initialCoffeeNotes.length - 1)
  })

  test("non-existant ID will fail with 404", async () => {
    const nonExistantId = await testHelper.nonExistantId()

    const userToken = await getUserToken()
    await api
      .delete(`/api/coffee/${nonExistantId}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(404)
    
    const afterDelete = await Coffee.find({})
    expect(afterDelete).toHaveLength(testHelper.initialCoffeeNotes.length)
  })

  test("invalid ID will fail with 400", async () => {
    const invalidId = "helloThisIsInvalidIdSpeaking"

    const userToken = await getUserToken()
    await api
      .delete(`/api/coffee/${invalidId}`)
      .set("Authorization", `bearer ${userToken}`)
      .expect(400)
  
    const afterDelete = await Coffee.find({})
    expect(afterDelete).toHaveLength(testHelper.initialCoffeeNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})