const app = require("../app")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const supertest = require("supertest")
const User = require("../models/user")

const api = supertest(app)

describe("functionality of user creation", () => {
  beforeEach(async () => {
    User.deleteMany({})
  
    const rounds = 10
    const passwordHash = await bcrypt.hash("password", rounds)
    const newUser = new User({
      username: "test",
      passwordHash
    })
    await newUser.save()
  })
  
  test("creating a new user succeeds", async () => {
    const newUser = {
      username: "unique",
      password: "badPassword"
    }

    const res = await api
      .post("/api/user")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const user = res.body
    expect(user.username).toBe("unique")
    expect(user.passwordHash).not.toBeDefined()
  })

  test("creating a user with redundant username fails", async () => {
    const redundant = {
      username: "test",
      password: "badPassword"
    }

    await api
      .post("/api/user")
      .send(redundant)
      .expect(400)
  })

  test("missing fields will return 400", async () => {
    const missing = {
      username: "user"
    }

    await api
      .post("/api/user")
      .send(missing)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})