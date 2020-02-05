import '@babel/polyfill'
import app from '../src/app'
import supertest from 'supertest'
import mongoose from 'mongoose'

const request = supertest(app)

describe('event routes', () => {
  beforeAll(() => {
    const devDbUrl = 'mongodb+srv://bh_dev:GpjbKQEUu8cDzgFV@cluster0-hu2oi.mongodb.net/test?retryWrites=true&w=majority'
    const mongoDB = process.env.MONGODB_URI || devDbUrl
    mongoose.connect(mongoDB)
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })

  it('should get status endpoint', async done => {
    const res = await request.get('/events/status')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Successfully connected to server.')

    done()
  })

  it('should crud event', async (done) => {
    const event = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jak.kowalski@example.com',
      eventDate: '01/01/2021'
    }
    const tempData = {}

    let res = await request.post('/events/create').send(event)
    expect(res.status).toBe(200)

    tempData.id = res.body.id

    res = await request.get('/events/' + tempData.id)
    expect(res.status).toBe(200)

    res = await request.put('/events/' + tempData.id + '/update')
    expect(res.status).toBe(200)

    res = await request.delete('/events/' + tempData.id + '/delete')
    expect(res.status).toBe(200)

    done()
  })
})
