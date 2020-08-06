const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Bean = require("../models/bean")
const testHelper = require("./beanTestHelper")

const api = supertest(app)

beforeEach(async () => {
  await Bean.deleteMany({})

  const initialBeans = testHelper.initialBeans
  const beanDocuments = initialBeans.map(bean => new Bean(bean))
  const beanPromises = beanDocuments.map(bean => bean.save())

  await Promise.all(beanPromises)
})

describe("GET", () => {
  test("all beans in DB", async () => {
    const result = await api
      .get("/api/bean")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const beansInDb = result.body
    expect(beansInDb).toHaveLength(testHelper.initialBeans)
    beansInDb.forEach(bean => {
      expect(testHelper.initialBeans).toContainEqual(bean.toJSON())
    })
  })

  test("specific origin beans", async () => {
    const result = await api
      .get("/api/bean/colombia")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const origins = result.body.map(bean => bean.origin.toLowerCase())
    expect(origins).toHaveLength(1)
    expect(origins).toContainEqual("colombia")
  })
})

afterAll(() => {
  mongoose.connection.close()
})