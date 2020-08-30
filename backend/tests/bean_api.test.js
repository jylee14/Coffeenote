const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Bean = require('../models/bean')
const testHelper = require('./beanTestHelper')

const api = supertest(app)

beforeEach(async () => {
  await Bean.deleteMany({})

  const initialBeans = testHelper.initialBeans
  const beanDocuments = initialBeans.map(bean => new Bean(bean))
  const beanPromises = beanDocuments.map(bean => bean.save())

  await Promise.all(beanPromises)
})

describe('GET', () => {
  test('all beans in DB', async () => {
    const result = await api
      .get('/api/bean')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const beansInDb = result.body
    expect(beansInDb).toHaveLength(testHelper.initialBeans.length)
    beansInDb.forEach(bean => {
      expect(testHelper.initialBeans).toContainEqual({
        origin: bean.origin,
        roastDate: new Date(bean.roastDate).toISOString().split('T')[0]
      })
    })
  })

  test('specific origin beans', async () => {
    const result = await api
      .get('/api/bean/colombia')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const origins = result.body.map(bean => bean.origin.toLowerCase())
    expect(origins).toHaveLength(1)
    expect(origins).toContainEqual('colombia')
  })

  test('specific roast date', async () => {
    const result = await api
      .get('/api/bean/20200801')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const beans = result.body
    expect(beans).toHaveLength(1)

    const bean = beans[0]
    expect(bean.origin).toEqual('Ethiopia')
    expect(new Date(bean.roastDate)).toEqual(new Date('2020-08-01'))
  })

  test('specific origin bean roasted on a date', async () => {
    const result = await api
      .get('/api/bean/ethiopia/20200515')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const beans = result.body
    expect(beans).toHaveLength(1)

    const bean = beans[0]
    expect(bean.origin).toEqual('Ethiopia')
    expect(new Date(bean.roastDate)).toEqual(new Date('2020-05-15'))
  })
})

describe('POST', () => {
  test('valid entries are added to the DB', async () => {
    const validBean = {
      roastDate: new Date('2020-12-31'),
      origin: 'Finland'
    }

    await api
      .post('/api/bean')
      .send(validBean)
      .expect(201)
    
    const dbAfterPost = await Bean.find({})
    const beanObjects = dbAfterPost.map(doc => {
      return {
        origin: doc.origin,
        roastDate: doc.roastDate
      }
    })
    expect(dbAfterPost).toHaveLength(testHelper.initialBeans.length + 1)
    expect(beanObjects).toContainEqual(validBean)
  })

  test('invalid entries are rejected (missing origin)', async () => {
    const invalidBean = {
      roastDate: new Date()
    }

    await api
      .post('/api/bean')
      .send(invalidBean)
      .expect(400)
  })
  
  test('invalid entries are rejected (missing roast date)', async () => {
    const invalidBean = {
      origin: 'Germany'
    }

    await api
      .post('/api/bean')
      .send(invalidBean)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})